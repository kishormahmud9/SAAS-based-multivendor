import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth/middleware'

export const PATCH = requireAdmin(async (
    request: NextRequest,
    user,
    context?: { params: { id: string } }
) => {
    try {
        if (!context) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        const { id } = await context.params
        const body = await request.json()

        const data = { ...body }
        if (data.targetDate && data.targetDate.trim() !== "") {
            data.targetDate = new Date(data.targetDate)
        } else if (data.targetDate === "" || data.targetDate === null) {
            data.targetDate = null
        }

        const banner = await prisma.banner.update({
            where: { id },
            data: data
        })

        return NextResponse.json({ success: true, data: banner })
    } catch (error) {
        console.error('Error updating banner:', error)
        return NextResponse.json({ success: false, error: 'Failed to update banner' }, { status: 500 })
    }
})

export const DELETE = requireAdmin(async (
    request: NextRequest,
    user,
    context?: { params: { id: string } }
) => {
    try {
        if (!context) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
        const { id } = await context.params

        await prisma.banner.delete({
            where: { id }
        })

        return NextResponse.json({ success: true, message: 'Banner deleted successfully' })
    } catch (error) {
        console.error('Error deleting banner:', error)
        return NextResponse.json({ success: false, error: 'Failed to delete banner' }, { status: 500 })
    }
})
