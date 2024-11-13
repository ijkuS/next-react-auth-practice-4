'use server';

import {
	PUBLIC_HOME_ROUTE,
	SESSION_COOKIE_NAME,
} from '@/routes/middleware-constants';
import { getSessionData } from './get-session-data';

export async function getServerSideProps(context) {
	const { req } = context;
	const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
	const sessionCookie = cookies[SESSION_COOKIE_NAME];

	let initialUserData = { user: null, role: 'visitor' };

	if (sessionCookie) {
		try {
			const sessionData = JSON.parse(
				decodeURIComponent(sessionCookie)
			);
			initialUserData = {
				user: {
					uid: sessionData.uid,
				},
				role: sessionData.role,
			};
		} catch (error) {
			console.error('Error parsing session cookie:', error);
		}
	}

	return { props: { initialUserData } };
}
