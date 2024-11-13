import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	res.setHeader(
		'Set-Cookie',
		`${SESSION_COOKIE_NAME}=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict`
	);
	res.status(200).json({ success: true });
	console.log('Session removed');
}
