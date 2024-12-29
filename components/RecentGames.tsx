'use client';

import { GameCard } from '@/components/GameCard';
import { games } from '@/data/games';
import { useEffect, useState } from 'react';

function useScreenSize() {
	const [gamesCount, setGamesCount] = useState(6);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 1280) {
				// xl breakpoint
				setGamesCount(10);
			} else if (window.innerWidth >= 1024) {
				// lg breakpoint
				setGamesCount(8);
			} else {
				setGamesCount(6);
			}
		}

		// Imposta il valore iniziale
		handleResize();

		// Aggiungi event listener per il resize
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return gamesCount;
}

export function RecentGames() {
	const gamesCount = useScreenSize();

	// Prendiamo le ultime N partite in base alla dimensione dello schermo
	const recentGames = [...games]
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, gamesCount);

	return (
		<section className="mt-8">
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Ultime partite inserite
				</span>
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{recentGames.map((game) => (
					<GameCard
						key={game.id}
						game={game}
					/>
				))}
			</div>
		</section>
	);
}
