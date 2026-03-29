import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(request, res, sessionOptions);

  const { pathname } = request.nextUrl;

  // Protected routes: /admin and its subroutes
  if (pathname.startsWith('/admin')) {
    if (!session.isLoggedIn) {
      // Redirect to login if trying to access admin without session
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Auth pages: /login, /register
  if (pathname === '/login' || pathname === '/register') {
    if (session.isLoggedIn) {
      // Redirect to admin if already logged in and trying to access auth pages
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
