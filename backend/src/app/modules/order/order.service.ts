import { prisma } from '../../db_connection';
import { inventoryRepository } from '../inventory/inventory.repository';
import eventEmitter from '../../utils/events';

const placeOrder = async (orderData: any, items: any[]) => {
  const result = await (prisma as any).$transaction(async (tx: any) => {
    // 1. Create Main Order
    const order = await tx.order.create({
      data: orderData,
    });

    // 2. Group items by Store for splitting
    const storeGroups: Record<string, any[]> = {};
    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Product not found: ${item.productId}`);
      
      const sid = product.storeId;
      if (!storeGroups[sid]) storeGroups[sid] = [];
      storeGroups[sid].push({ ...item, storeId: sid, costPrice: product.costPrice });

      // 3. Deduct Stock & Log Ledger
      await inventoryRepository.deductStock(tx, item.productId, item.variantId || null, item.quantity, order.id, 'SALE');
    }

    // 4. Create Vendor Orders & Order Items
    for (const [storeId, storeItems] of Object.entries(storeGroups)) {
      const subtotal = storeItems.reduce((acc, item) => acc + item.totalPrice, 0);
      
      // Get store for commission rate
      const store = await tx.store.findUnique({ where: { id: storeId } });
      const commissionRate = store?.commissionRate || 10;
      const commission = (subtotal * Number(commissionRate)) / 100;
      const vendorEarns = subtotal - commission;

      const vendorOrder = await tx.vendorOrder.create({
        data: {
          orderId: order.id,
          storeId,
          subtotal,
          commission,
          vendorEarns,
          status: 'PENDING',
        },
      });

      await tx.orderItem.createMany({
        data: storeItems.map((item) => ({
          orderId: order.id,
          vendorOrderId: vendorOrder.id,
          productId: item.productId,
          variantId: item.variantId || null,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      });
    }

    return order;
  });

  // Emit event outside transaction for decoupled automation (notifications, etc)
  eventEmitter.emit('order.placed', result);

  return result;
};

const cancelOrder = async (orderId: string, reason: string) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.status === 'CANCELLED') {
      throw new Error('Order not found or already cancelled');
    }

    // 1. Restore Stock
    for (const item of order.items) {
      await inventoryRepository.addStock(tx, item.productId, item.variantId || null, item.quantity, order.id, 'CANCEL_RESTORE');
    }

    // 2. Update Statuses
    await tx.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED', cancelledAt: new Date(), adminNote: reason },
    });

    await tx.vendorOrder.updateMany({
      where: { orderId },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });

    return order;
  });
};

export const orderEngine = {
  placeOrder,
  cancelOrder,
};
