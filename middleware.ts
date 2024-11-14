import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Initialize NextAuth authentication middleware
export default NextAuth(authConfig).auth;

// Define allowed regions and the default region
const allowedRegions: string[] = ['us', 'sg', 'gb', 'in'];
const defaultRegion: string = 'us';

export function middleware(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;
    const segments = pathname.split('/').filter(Boolean);
    const { geo } = request;

    console.log('geo', geo?.region, geo?.country, geo);

    // Check for existing region cookie
    const regionCookie = request.cookies.get('region');
    let region: any = regionCookie ? regionCookie.value : geo?.region?.toLowerCase() || "xx";

    // Validate the detected region; use the default region if it's invalid
    // if (!allowedRegions.includes(region)) {
    //     region = defaultRegion;
    // }

    // Redirect `/build` or `/featured-builds` without a region prefix to `/{region}/build`
    if (pathname === '/build' || pathname === '/featured-builds') {
        const url = request.nextUrl.clone();
        url.pathname = `/${region}/${pathname}`; // Redirect to `/{region}/build`
        return NextResponse.redirect(url);
    }

    // If the request is for `/[region]/build` or `/[region]/featured-builds` with an invalid region, redirect to `/{region}/build`
    if ((segments[1] === 'build' || segments[1] === 'featured-builds') && !allowedRegions.includes(segments[0])) {
        const url = request.nextUrl.clone();
        url.pathname = `/${region}/${segments[1]}`; // Redirect to `/{region}/build`
        return NextResponse.redirect(url);
    }

    // Proceed with the authentication
    const response = NextResponse.next();

    // Set the region as a cookie if not already present
    if (!regionCookie) {
        response.cookies.set('region', region, { path: '/', maxAge: 31536000 }); // Set cookie for 1 year
    }

    return response;
}

export const config = {
    // Apply middleware only to `/build` and `/[region]/build` paths, excluding other paths as defined in your authConfig matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/build', '/:region(build)'],
};
