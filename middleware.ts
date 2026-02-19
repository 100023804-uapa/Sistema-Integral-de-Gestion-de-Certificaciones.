import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'session';

function hasValidSession(request: NextRequest): boolean {
    return request.cookies.get(SESSION_COOKIE)?.value === '1';
}

function isProtectedRoute(pathname: string): boolean {
    return pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
}

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const hasSession = hasValidSession(request);

    if (isProtectedRoute(pathname) && !hasSession) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('next', `${pathname}${search || ''}`);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname === '/login' && hasSession) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/login'],
};
