import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth/middleware'

export const GET = requireAdmin(async (request: NextRequest) => {
    try {
        const settings = await prisma.uiSetting.findMany()
        return NextResponse.json({ success: true, data: settings })
    } catch (error) {
        console.error('Error fetching UI settings:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 })
    }
})

export const POST = requireAdmin(async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { key, value } = body

        if (!key) {
            return NextResponse.json({ success: false, error: 'Key is required' }, { status: 400 })
        }

        const setting = await prisma.uiSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        })

        return NextResponse.json({ success: true, data: setting })
    } catch (error) {
        console.error('Error saving UI setting:', error)
        return NextResponse.json({ success: false, error: 'Failed to save setting' }, { status: 500 })
    }
})
