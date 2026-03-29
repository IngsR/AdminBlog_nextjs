import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;

  // 1. Safety Guard: Skip if session secret is missing to prevent 500 errors
  if (!sessionOptions.password) {
    return res;
  }

  try {
    const session = await getIronSession<SessionData>(request, res, sessionOptions);

    // 2. Simple logic for protected admin routes
    if (pathname.startsWith('/admin') && !session.isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Simple logic for auth pages (redirect to admin if already logged in)
    if (['/login', '/register'].includes(pathname) && session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  } catch (error) {
    console.error('Middleware session error:', error);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
