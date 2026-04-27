import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth/middleware'

export const GET = requireAdmin(async (request: NextRequest) => {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ success: true, data: banners })
    } catch (error) {
        console.error('Error fetching banners:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch banners' }, { status: 500 })
    }
})

export const POST = requireAdmin(async (request: NextRequest) => {
    try {
        const body = await request.json()
        const banner = await prisma.banner.create({
            data: {
                ...body,
                image: body.image || null,
                targetDate: (body.targetDate && body.targetDate.trim() !== "") ? new Date(body.targetDate) : null
            }
        })
        return NextResponse.json({ success: true, data: banner })
    } catch (error) {
        console.error('Error creating banner:', error)
        return NextResponse.json({ success: false, error: 'Failed to create banner' }, { status: 500 })
    }
})
