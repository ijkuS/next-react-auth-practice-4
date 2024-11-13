'use client';

import { createSession, removeSession } from '@/actions/auth-actions';
import {
	onUserStateChange,
	login as firebaseLogin,
	logout as firebaseLogout,
} from '@/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

export default function useUserSession() {
	// initialUser = { user: null, uid: null, role: 'visitor' };
	const [user, setUser] = useState(null);
	const [role, setRole] = useState('visitor');
	console.log('this is 1st check:', user, user && user.uid, role);

	// Handle login, update session and role
	const login = async () => {
		try {
			const loggedInUser = await firebaseLogin();
			const userRole = loggedInUser.isAdmin ? 'admin' : 'member'; // Determine role based on isAdmin property

			setUser(loggedInUser);
			setRole(userRole);
			console.log('Login successful', {
				user: loggedInUser,
				uid: loggedInUser.uid,
				role: userRole,
			});
			await createSession(loggedInUser, loggedInUser.uid, userRole);
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	const logout = async () => {
		try {
			await firebaseLogout();
			await removeSession();
			setUser(null);
			setRole('visitor');
			console.log('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	useEffect(() => {
		onUserStateChange((authUser) => {
			if (authUser) {
				console.log('🍎🍎 this is AuthUser', authUser);
				const newRole = authUser.isAdmin ? 'admin' : 'member';
				setUser(authUser);
				setRole(newRole);
				console.log('🍏🍏 this is newRole', newRole);
			} else {
				setUser(null);
				setRole('visitor');
				console.log('User logged out');
			}
		});
	}, []);
	console.log('this is 2nd check:', user, user && user.uid, role);
	console.log(user, `Your role: ${role}. this is from use-user-session`);
	return { user, role, login, logout };
}
