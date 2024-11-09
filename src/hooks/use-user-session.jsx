'use client';

import { createSession, removeSession } from '@/actions/auth-actions';
import {
	onUserStateChange,
	login as firebaseLogin,
	logout as firebaseLogout,
} from '@/app/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

export default function useUserSession(initSession) {
	const [user, setUser] = useState(initSession || null);
	const [role, setRole] = useState('visitor');

	// Handle login, update session and role
	const login = async () => {
		try {
			const user = await firebaseLogin();
			const role = user.isAdmin ? 'admin' : 'member'; // Determine role based on isAdmin property

			await createSession(user.uid, role);
			setUser(user.uid);
			setRole(role);
			console.log('Login successful', {
				user,
				role,
			});
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
		const unsubscribe = onUserStateChange(async (authUser) => {
			if (authUser) {
				setUser(authUser.uid);
				setRole(authUser.isAdmin ? 'admin' : 'member');
				console.log('useEffect from useUserSession');
			} else {
				setUser(null);
				setRole('visitor');
			}
		});
		return () => unsubscribe();
	}, []);
	console.log(user, `Your role: ${role}`);
	return { user, role, login, logout };
}
