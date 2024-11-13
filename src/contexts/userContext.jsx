'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
// Define a context to provide user session data globally.

const UserContext = createContext(null);

export function UserContextProvider({
	children,
	initialUserData = { user: null, role: 'visitor' },
}) {
	const [user, setUser] = useState(initialUserData.user);
	const [role, setRole] = useState(initialUserData.role);

	useEffect(() => {
		setUser(initialUserData.user);
		setRole(initialUserData.role);
	}, [initialUserData]);
	return (
		<UserContext.Provider value={{ user, role }}>
			{children}
		</UserContext.Provider>
	);
}
export function useUserContext() {
	return useContext(UserContext);
}
