import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ success: true, data: banners })
    } catch (error) {
        console.error('Error fetching banners:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch banners' }, { status: 500 })
    }
}
