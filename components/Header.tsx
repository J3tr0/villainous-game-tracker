'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ModeToggle } from './ModeToggler';
import { NewGameDialog } from './NewGameDialog';

export default function Header() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();
	const isHome = pathname === '/';

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Image
				src="/logo-disney-villainous.png"
				alt="Logo Disney Villainous"
				width={100}
				height={100}
				priority
			/>
		);
	}

	const Logo = () => (
		<Image
			src={
				theme === 'light'
					? '/logo-disney-villainous.png'
					: '/logo-disney-villainous-dark.png'
			}
			alt="Logo Disney Villainous"
			width={100}
			height={100}
			priority
		/>
	);

	return (
		<header className="flex justify-between items-center px-4 pt-4">
			{isHome ? (
				<Logo />
			) : (
				<Link
					href="/"
					className="hover:opacity-80 transition-opacity">
					<Logo />
				</Link>
			)}
			<span className="flex items-center gap-2">
				{!isHome && (
					<Button
						variant="ghost"
						size="icon"
						asChild>
						<Link
							href="/"
							className="hover:opacity-80">
							<Home className="h-5 w-5" />
						</Link>
					</Button>
				)}
				<NewGameDialog />
				<ModeToggle />
			</span>
		</header>
	);
}
