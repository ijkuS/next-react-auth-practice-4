import useUserSession from '@/hooks/use-user-session';
import Link from 'next/link';
import React from 'react';

export default function Header({ session }) {
	const { user, role, login, logout } = useUserSession(session);

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
