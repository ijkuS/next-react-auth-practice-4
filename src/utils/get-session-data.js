'use server';

import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export function getSessionData(req) {
	const cookie = req.cookies[SESSION_COOKIE_NAME];
	if (!cookie) return { user: null, uid: null, role: 'visitor' };

	try {
		const session = JSON.parse(decodeURIComponent(cookie));
		return {
			user: null,
			uid: session.uid,
			role: session.role || 'visitor',
		};
	} catch (error) {
		console.error('Error parsing session cookie:', error);
		return { user: null, uid: null, role: 'visitor' };
	}
}
