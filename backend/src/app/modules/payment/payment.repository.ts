import { prisma } from '../../db_connection';

const createOrder = async (orderData: any, items: any[]) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    // 1. Create Order
    const order = await tx.order.create({
      data: orderData,
    });

    // 2. Create Order Items
    const orderItemsData = items.map((item: any) => ({
      orderId: order.id,
      productId: item.productId,
      variantId: item.variantId || null,
      productName: item.productName,
      variantName: item.variantName || null,
      sku: item.sku || null,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    return order;
  });
};

const createPaymentRecord = async (paymentData: any) => {
  return await (prisma as any).payment.create({
    data: paymentData,
  });
};

const completeOrderPayment = async (orderId: string, paymentId: string, gatewayTxId: string, response: any) => {
  return await (prisma as any).$transaction(async (tx: any) => {
    // 1. Update Payment
    const payment = await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: 'PAID',
        gatewayTxId,
        gatewayResponse: response,
        paidAt: new Date(),
      },
    });

    // 2. Update Order
    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        confirmedAt: new Date(),
      },
    });

    // 3. Optional: Split order into VendorOrders (skipped for MVP simplicity, but ready)

    return payment;
  });
};

export const paymentRepository = {
  createOrder,
  createPaymentRecord,
  completeOrderPayment,
};
