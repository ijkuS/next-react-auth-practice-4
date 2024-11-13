import useUserSession from '@/hooks/use-user-session';
import React from 'react';

export default function adminDashboard() {
	// const { user, role } = useUserContext();
	const { user, uid, role } = useUserSession();

	return (
		<div>
			<h1>Dashboard</h1>
			{user ? (
				<p>
					Welcome, {user.displayName}. Your role is: {role}
				</p>
			) : (
				<p>Please log in to access the dashboard.</p>
			)}
		</div>
	);
}
