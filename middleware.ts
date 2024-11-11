import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Initialize NextAuth authentication middleware
export default NextAuth(authConfig).auth;

// Define allowed regions and the default region
const allowedRegions = ['sg', 'us', 'uk', 'in'];
const defaultRegion = 'sg';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/').filter(Boolean);
    const region = segments[0]; // Assume region is the first path segment

    // Redirect `/build` without a region prefix to `/sg/build`
    if (pathname === '/build') {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultRegion}/build`; // Redirect to `/sg/build`
        return NextResponse.redirect(url);
    }

    // If the request is for `/[region]/build` but has an invalid region, redirect to `/sg/build`
    if (segments[1] === 'build' && !allowedRegions.includes(region)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultRegion}/build`; // Redirect to `/sg/build`
        return NextResponse.redirect(url);
    }

    // Proceed with the authentication
    return NextResponse.next();
}

export const config = {
    // Apply middleware only to `/build` and `/[region]/build` paths, excluding other paths as defined in your authConfig matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/build', '/:region(build)'],
};
