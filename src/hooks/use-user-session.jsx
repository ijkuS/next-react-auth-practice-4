import { onUserStateChange } from '@/app/libs/firebase/auth';
import React, { useEffect, useState } from 'react';

export default function useUserSession(initSession) {
	const [user, setUser] = useState(initSession);
	let role = 'visitor';

	useEffect(() => {
		const unsubscribe = onUserStateChange(async (authUser) => {
			setUser(authUser ? authUser.uid : null);

			if (authUser) {
				if (authUser.isAdmin) {
					role = 'admin';
				} else {
					role = 'member';
					console.log(authUser, 'this is from authUser');
				}
			}
		});
		return () => unsubscribe();
	}, []);
	return { user, role };
}
