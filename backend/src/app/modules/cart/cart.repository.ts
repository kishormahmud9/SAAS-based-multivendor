import { prisma } from '../../db_connection';

const getCart = async (userId: string) => {
  return await (prisma as any).cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
};

const updateCartItem = async (userId: string, productId: string, variantId: string | null, quantity: number) => {
  let cart = await (prisma as any).cart.findUnique({ where: { userId } });
  
  if (!cart) {
    cart = await (prisma as any).cart.create({ data: { userId } });
  }

  if (quantity <= 0) {
    return await (prisma as any).cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
        variantId,
      },
    });
  }

  return await (prisma as any).cartItem.upsert({
    where: {
      cartId_productId_variantId: {
        cartId: cart.id,
        productId,
        variantId,
      },
    },
    update: { quantity },
    create: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
    },
  });
};

const clearCart = async (userId: string) => {
  const cart = await (prisma as any).cart.findUnique({ where: { userId } });
  if (cart) {
    return await (prisma as any).cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
};

const syncGuestCart = async (userId: string, guestItems: any[]) => {
  let cart = await (prisma as any).cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await (prisma as any).cart.create({ data: { userId } });
  }

  for (const item of guestItems) {
    await (prisma as any).cartItem.upsert({
      where: {
        cartId_productId_variantId: {
          cartId: cart.id,
          productId: item.productId,
          variantId: item.variantId || null,
        },
      },
      update: {
        quantity: { increment: item.quantity },
      },
      create: {
        cartId: cart.id,
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
      },
    });
  }
};

export const cartRepository = {
  getCart,
  updateCartItem,
  clearCart,
  syncGuestCart,
};
