import Header from '@/components/Header';

import '../app/globals.css';
import useUserSession from '@/hooks/use-user-session';

export default async function RootLayout({ children }) {
	// const storedCookies = await cookies();
	// const session = storedCookies.get(SESSION_COOKIE_NAME)?.value;

	return (
		<html>
			<body>
				<main className='main-wrapper'>
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
