import useUserSession from '@/hooks/use-user-session';
import Link from 'next/link';
import React from 'react';

export default function Header({ session }) {
	const { user, role, login, logout } = useUserSession(session);

	// const handleLogin = async () => {
	// 	try {
	// 		const user = await login();
	// 		const userId = user.uid;
	// 		await createSession(userId, role);
	// 		console.log('Login successful:', { user, role }); // Log userId and role after successful session creation
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const handleLogout = async () => {
	// 	await logout();
	// 	await removeSession();
	// 	console.log('Logged out!!!');
	// };

	return (
		<header>
			<Link href='/'>
				<h2>LOGO</h2>
			</Link>
			<menu>
				<Link href='/products/all'>Products</Link>
				{role === 'member' && <Link href='/cart'>Cart</Link>}
				{role === 'admin' && (
					<Link href='/admin/dashboard'>Admin</Link>
				)}
			</menu>
			{user ? (
				<button onClick={logout}>Logout</button>
			) : (
				<button onClick={login}>Login</button>
			)}
		</header>
	);
}
