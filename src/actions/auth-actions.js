'use server';

export async function createSession(user, uid, role) {
	try {
		const response = await fetch('/api/set-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user, uid, role }),
		});
		if (!response.ok) {
			throw new Error('Failed to create session');
		}
	} catch (error) {
		console.error('Error creating session:', error);
		return { success: false, error };
	}
}
export async function removeSession() {
	try {
		const response = await fetch('/api/remove-session', {
			method: 'POST',
		});
		if (!response.ok) throw new Error('Failed to remove session');
	} catch (error) {
		console.error('Error removing session:', error);
	}
}
