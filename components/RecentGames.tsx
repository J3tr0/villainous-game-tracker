'use client';

import { GameCard } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { GameWithPlayers } from '@/lib/types';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/games/sheet');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export function RecentGames() {
	const { data: games, error } = useSWR<GameWithPlayers[]>(
		'/api/games/sheet',
		fetcher,
		{
			refreshInterval: 5000, // Aggiorna ogni 5 secondi
		}
	);

	if (error) {
		return (
			<section className="mt-8">
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Ultime partite inserite
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);
	}

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

	const sortedGames = [...games]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

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
					variant="outline"
					className="bg-gradient-to-tl from-pink-500 to-indigo-800 text-white">
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
