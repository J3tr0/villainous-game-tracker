'use client';

import { GameCard } from '@/components/GameCard';
import { GamesFilter } from '@/components/GamesFilter';
import { GameWithPlayers } from '@/lib/types';
import { useState } from 'react';

export function GamesPageClient({
	games: initialGames,
}: {
	games: GameWithPlayers[];
}) {
	const [filteredGames, setFilteredGames] = useState(initialGames);

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Tutte le partite
					</span>
				</h1>

				<GamesFilter
					games={initialGames}
					onFilter={setFilteredGames}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{filteredGames.map((game) => (
						<GameCard
							key={game.id}
							game={game}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
