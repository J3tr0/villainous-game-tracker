'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ModeToggle } from './ModeToggler';
import { NewGameDialog } from './NewGameDialog';

export default function Header() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

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

	return (
		<header className="flex justify-between items-center">
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
			<span className="flex items-center gap-2">
				<NewGameDialog />
				<ModeToggle />
			</span>
		</header>
	);
}
