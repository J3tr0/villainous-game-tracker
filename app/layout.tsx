import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';

const robotoCondensed = Roboto_Condensed({
	variable: '--font-roboto-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Disney Villainous - Statistiche',
	description: 'Statistiche delle partite di Disney Villainous',
	robots: {
		index: false,
		follow: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="it"
			suppressHydrationWarning>
			<body className={`${robotoCondensed.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
					<Header />

					{children}

					<Footer />
					<Toaster />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
