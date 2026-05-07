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

  // Use findFirst + create/update instead of upsert to handle nullable variantId in unique constraint
  const existingItem = await (prisma as any).cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      variantId,
    },
  });

  if (existingItem) {
    return await (prisma as any).cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
    });
  } else {
    return await (prisma as any).cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantId,
        quantity,
      },
    });
  }
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
    const vId = item.variantId || null;
    
    const existingItem = await (prisma as any).cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: item.productId,
        variantId: vId,
      },
    });

    if (existingItem) {
      await (prisma as any).cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: { increment: item.quantity },
        },
      });
    } else {
      await (prisma as any).cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          variantId: vId,
          quantity: item.quantity,
        },
      });
    }
  }
};

const updateQuantity = async (userId: string, itemId: string, quantity: number) => {
  const cart = await (prisma as any).cart.findUnique({ where: { userId } });
  if (!cart) throw new Error('Cart not found');

  if (quantity <= 0) {
    return await (prisma as any).cartItem.delete({
      where: { id: itemId, cartId: cart.id },
    });
  }

  return await (prisma as any).cartItem.update({
    where: { id: itemId, cartId: cart.id },
    data: { quantity },
  });
};

const removeItem = async (userId: string, itemId: string) => {
  const cart = await (prisma as any).cart.findUnique({ where: { userId } });
  if (!cart) throw new Error('Cart not found');

  return await (prisma as any).cartItem.delete({
    where: { id: itemId, cartId: cart.id },
  });
};

export const cartRepository = {
  getCart,
  updateCartItem,
  clearCart,
  syncGuestCart,
  updateQuantity,
  removeItem,
};
