import { createSession, removeSession } from '@/actions/auth-actions';
import { login, logout } from '@/app/libs/firebase/auth';
import useUserSession from '@/hooks/use-user-session';
import Link from 'next/link';
import React from 'react';

export default function Header({ session }) {
	const { user, role } = useUserSession(session);
	// let userRole = 'visitor';

	const handleLogin = async () => {
		const userId = await login();
		await createSession(userId, role);
	};
	const handleLogout = async () => {
		await logout();
		await removeSession();
	};

	return (
		<header>
			<Link href='/'>
				<h2>LOGO</h2>
			</Link>
			<menu>
				<Link href='/products/all'>Products</Link>
				<Link href='/cart'>Cart</Link>
				<Link href='/admin/dashboard'>Admin</Link>
			</menu>

			<button onClick={handleLogout}>Logout</button>
			<button onClick={handleLogin}>Login</button>
		</header>
	);
}
