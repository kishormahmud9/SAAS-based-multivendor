import { prisma } from '../../db_connection';

const deductStock = async (tx: any, productId: string, variantId: string | null, quantity: number, referenceId: string, reason: string) => {
  if (variantId) {
    const variant = await tx.productVariant.update({
      where: { id: variantId },
      data: {
        stock: { decrement: quantity },
      },
    });

    if (variant.stock < 0) {
      throw new Error(`Insufficient stock for variant: ${variant.name}`);
    }

    await tx.inventoryLedger.create({
      data: {
        productId,
        variantId,
        changeQty: -quantity,
        stockAfter: variant.stock,
        reason,
        referenceId,
      },
    });
  } else {
    const product = await tx.product.update({
      where: { id: productId },
      data: {
        stock: { decrement: quantity },
      },
    });

    if (product.stock < 0) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    await tx.inventoryLedger.create({
      data: {
        productId,
        changeQty: -quantity,
        stockAfter: product.stock,
        reason,
        referenceId,
      },
    });
  }
};

const addStock = async (tx: any, productId: string, variantId: string | null, quantity: number, referenceId: string, reason: string) => {
  if (variantId) {
    const variant = await tx.productVariant.update({
      where: { id: variantId },
      data: {
        stock: { increment: quantity },
      },
    });

    await tx.inventoryLedger.create({
      data: {
        productId,
        variantId,
        changeQty: quantity,
        stockAfter: variant.stock,
        reason,
        referenceId,
      },
    });
  } else {
    const product = await tx.product.update({
      where: { id: productId },
      data: {
        stock: { increment: quantity },
      },
    });

    await tx.inventoryLedger.create({
      data: {
        productId,
        changeQty: quantity,
        stockAfter: product.stock,
        reason,
        referenceId,
      },
    });
  }
};

export const inventoryRepository = {
  deductStock,
  addStock,
};
