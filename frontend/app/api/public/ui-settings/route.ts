import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const key = searchParams.get('key')

        if (key) {
            const setting = await prisma.uiSetting.findUnique({
                where: { key }
            })
            return NextResponse.json({ success: true, data: setting })
        }

        const settings = await prisma.uiSetting.findMany()
        return NextResponse.json({ success: true, data: settings })
    } catch (error) {
        console.error('Error fetching UI settings:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 })
    }
}
