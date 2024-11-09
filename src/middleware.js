import { NextResponse } from 'next/server';
import {
	ADMIN_ADDNEW_ROUTE,
	ADMIN_ROOT_ROUTE,
	CART_ROUTE,
	PUBLIC_HOME_ROUTE,
	SESSION_COOKIE_NAME,
} from './routes/middleware-constants';

const adminOnlyRoutes = [ADMIN_ADDNEW_ROUTE, ADMIN_ROOT_ROUTE];
const memberOnlyRoutes = [CART_ROUTE];
const publicHomeRoutes = [PUBLIC_HOME_ROUTE];

export default function middleware(request) {
	const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

	// If there's no session cookie,
	// redirect unauthenticated users trying to access protected routes
	if (!sessionCookie) {
		if (
			adminOnlyRoutes.includes(request.nextUrl.pathname) ||
			memberOnlyRoutes.includes(request.nextUrl.pathname)
		) {
			return NextResponse.redirect(
				new URL(PUBLIC_HOME_ROUTE, request.url)
			);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/cart', '/admin/:path*'],
};
