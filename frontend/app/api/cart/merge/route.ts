import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/middleware'

export const POST = requireAuth(async (request: NextRequest, user) => {
    try {
        const body = await request.json()
        const { items } = body // [{ productId, quantity }]

        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { success: false, error: 'Items array is required' },
                { status: 400 }
            )
        }

        // Find or create cart for user
        let cart = await prisma.cart.findUnique({
            where: { userId: user.userId },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: user.userId },
            })
        }

        // Process each item
        for (const item of items) {
            const { productId, quantity } = item

            if (!productId || quantity < 1) continue

            // Check if product exists and has stock
            const product = await prisma.product.findUnique({
                where: { id: productId },
            })

            if (!product || product.isArchived) continue

            // Check if item already in cart
            const existingItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId,
                },
            })

            if (existingItem) {
                // Update quantity (summing them up)
                const newQuantity = Math.min(existingItem.quantity + quantity, product.stock)
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: newQuantity },
                })
            } else {
                // Add new item
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId,
                        quantity: Math.min(quantity, product.stock),
                    },
                })
            }
        }

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                                brand: true,
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            data: updatedCart,
            message: 'Cart merged successfully'
        })
    } catch (error) {
        console.error('Cart merge error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to merge cart' },
            { status: 500 }
        )
    }
})
