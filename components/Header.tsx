'use client';

import { Button } from '@/components/ui/button';
import { Facebook, Home, Instagram } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';

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
				loading="lazy"
				className="w-auto h-auto"
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
			loading="lazy"
			className="w-auto h-auto"
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
			</span>
			<div className="space-y-2">
				<div className="flex justify-center items-center gap-4 text-sm">
					<p className="flex items-center gap-2">
						Segui{' '}
						<Avatar className="h-6 w-6">
							<AvatarImage src="/Villainous_Italia_logo.png" />
						</Avatar>{' '}
						Villainous Italia su:
					</p>
					<a
						href="https://www.facebook.com/villainousitalia"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-primary hover:underline">
						<Facebook size={16} />
					</a>

					<a
						href="https://www.instagram.com/villainousitalia/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-primary hover:underline">
						<Instagram size={16} />
					</a>
				</div>
			</div>
		</header>
	);
}
