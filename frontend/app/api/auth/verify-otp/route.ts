import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyOTP } from '@/lib/auth/otp'
import { generateTokenPair } from '@/lib/auth/jwt'
import { setAuthCookies } from '@/lib/auth/cookies'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, otp, type, rememberMe = false } = body

        // Validate input
        if (!email || !otp || !type) {
            return NextResponse.json(
                { success: false, error: 'Email, OTP, and type are required' },
                { status: 400 }
            )
        }

        // Validate type
        if (type !== 'EMAIL_VERIFICATION' && type !== 'PASSWORD_RESET') {
            return NextResponse.json(
                { success: false, error: 'Invalid verification type' },
                { status: 400 }
            )
        }

        // Verify OTP - don't delete if it's for password reset (reset-password route will consume it)
        const verification = await verifyOTP(
            email, 
            otp, 
            type, 
            type !== 'PASSWORD_RESET'
        )

        if (!verification.valid) {
            return NextResponse.json(
                { success: false, error: verification.message || 'Invalid OTP' },
                { status: 400 }
            )
        }

        // Get user
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }

        // For email verification, update emailVerified
        if (type === 'EMAIL_VERIFICATION') {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }

        // Create response
        const response = NextResponse.json({
            success: true,
            message: 'Verification successful',
            user: type === 'EMAIL_VERIFICATION' ? {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: new Date(),
            } : undefined,
        })

        // For email verification, set tokens in HTTP-only cookies
        if (type === 'EMAIL_VERIFICATION') {
            // Generate access and refresh tokens
            const { accessToken, refreshToken } = generateTokenPair(
                user.id,
                user.email,
                user.role,
                rememberMe
            )
            setAuthCookies(response, accessToken, refreshToken, rememberMe)
        }

        return response

    } catch (error) {
        console.error('OTP verification error:', error)
        return NextResponse.json(
            { success: false, error: 'Verification failed. Please try again.' },
            { status: 500 }
        )
    }
}
