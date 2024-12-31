'use client';

import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { GameWithPlayers } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RecentGamesProps {
	games: GameWithPlayers[];
}

function useScreenSize() {
	const [gamesCount, setGamesCount] = useState(6);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 1280) {
				setGamesCount(10);
			} else if (window.innerWidth >= 1024) {
				setGamesCount(8);
			} else {
				setGamesCount(6);
			}
		}

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return gamesCount;
}

export function RecentGames({ games }: RecentGamesProps) {
	const gamesCount = useScreenSize();
	const [sortedGames, setSortedGames] = useState<GameWithPlayers[]>([]);

	useEffect(() => {
		const sorted = [...games].sort(
			(a, b) => b.date.getTime() - a.date.getTime()
		);
		setSortedGames(sorted.slice(0, gamesCount));
	}, [games, gamesCount]);

	if (!games || games.length === 0) {
		return (
			<section className="mt-8">
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Ultime partite inserite
					</span>
				</h2>
				<p className="text-muted-foreground">Nessuna partita disponibile</p>
			</section>
		);
	}

	return (
		<section className="mt-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Ultime partite inserite
					</span>
				</h2>
				<Button
					asChild
					variant="outline">
					<Link href="/games">Vedi tutte</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{sortedGames.map((game) => (
					<GameCard
						key={game.id}
						game={game}
					/>
				))}
			</div>
		</section>
	);
}
