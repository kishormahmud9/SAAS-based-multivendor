import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

// Role paths
const ROLE_PATHS = {
  ADMIN: '/admin',
  VENDOR: '/vendor',
  CUSTOMER: '/user',
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/shop',
  '/product',
  '/cart',
  '/forgot-password',
  '/reset-password',
];

// Routes that are only for guest users (should redirect to dashboard if logged in)
const AUTH_ROUTES = ['/login', '/register'];

/**
 * Decode JWT payload without verification (Edge compatible)
 */
function decodeJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // 1. Get token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const userPayload = accessToken ? decodeJwt(accessToken) : null;
  const userRole = userPayload?.role?.toUpperCase();

  const isAuthenticated = !!userPayload;

  // 2. Handle Auth Routes (Login/Register)
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Redirect logged-in users to their respective dashboard
      if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else if (userRole === 'VENDOR' || userRole === 'VENDOR_STAFF') {
        return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // 3. Define Protected Route Categories
  const isAdminRoute = pathname.startsWith('/admin');
  const isVendorRoute = pathname.startsWith('/vendor');
  // User/Customer routes (either prefixed with /user or specific common paths)
  const isUserRoute = pathname.startsWith('/user') || 
                      pathname.startsWith('/checkout');

  // 4. Protection Logic
  if (isAdminRoute || isVendorRoute || isUserRoute) {
    // Not logged in -> Redirect to login with return URL
    if (!isAuthenticated) {
      // Allow /cart and /checkout for guests if needed, 
      // but if the rule says protected, we redirect.
      // Usually cart is public, but let's follow strict rules.
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based protection
    if (isAdminRoute && !(userRole === 'SUPER_ADMIN' || userRole === 'ADMIN')) {
      // Wrong role trying to access Admin
      let target = '/user/dashboard';
      if (userRole === 'VENDOR' || userRole === 'VENDOR_STAFF') target = '/vendor/dashboard';
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (isVendorRoute && !(userRole === 'VENDOR' || userRole === 'VENDOR_STAFF')) {
      // Wrong role trying to access Vendor
      const target = (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') ? '/admin/dashboard' : '/user/dashboard';
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (isUserRoute && userRole !== 'CUSTOMER' && userRole !== 'USER') {
      // Wrong role trying to access User dashboard / profile / orders etc.
      let target = '/admin/dashboard'; 
      if (userRole === 'VENDOR' || userRole === 'VENDOR_STAFF') target = '/vendor/dashboard';
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/:path*',
    '/user/:path*',
    '/checkout/:path*',
    '/login',
    '/register',
  ],
};
