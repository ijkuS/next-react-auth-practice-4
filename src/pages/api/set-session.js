import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	const { uid, role } = req.body;
	const maxAge = 60 * 60 * 24; // oneday
	const sessionData = JSON.stringify({ uid, role });
	res.setHeader(
		'set-Cookie',
		`${SESSION_COOKIE_NAME}=${encodeURIComponent(
			sessionData
		)}; HttpOnly; Path=/; Max-Age=${maxAge}`
	);
	res.status(200).json({ success: true });
}
