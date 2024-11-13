import React from 'react';
import '../app/globals.css';
import Header from '@/components/Header';
// import { UserContextProvider } from '@/contexts/userContext';

export default function MyApp({ Component, pageProps }) {
	// const { initialUserData } = pageProps;
	return (
		// <UserContextProvider initialUserData={initialUserData}>
		<main className='main-wrapper'>
			<Header />
			<Component {...pageProps} />
		</main>
		// </UserContextProvider>
	);
}
