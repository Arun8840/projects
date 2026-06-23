import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const session = getSessionCookie(request); // reads cookie without DB hit

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/register');

  if (!session && !isAuthPage) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from hitting auth pages
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect everything except static files & Next internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
