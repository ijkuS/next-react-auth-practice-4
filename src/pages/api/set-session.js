import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default async function handler(req, res) {
	try {
		const { user, uid, role } = req.body;
		const maxAge = 60 * 60 * 24; // 1 day in seconds
		const sessionData = JSON.stringify({ user, uid, role });

		res.setHeader(
			'Set-Cookie',
			`${SESSION_COOKIE_NAME}=${encodeURIComponent(
				sessionData
			)}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict`
		);
		res.status(200).json({ success: true });
		console.log('Session set:', user, uid, role);
	} catch (error) {
		console.error('Error setting session:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to set session.',
		});
	}
}
