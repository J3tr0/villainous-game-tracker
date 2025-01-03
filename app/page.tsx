'use client';

import GameStats from '@/components/GameStats';
import { RecentGames } from '@/components/RecentGames';
import { GameWithPlayers } from '@/lib/types';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/games/sheet');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function Home() {
	const { data: games, error } = useSWR<GameWithPlayers[]>('games', fetcher);

	if (error) return <div>Errore nel caricamento dei dati</div>;
	if (!games) return <div>Caricamento...</div>;

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-4">
				<GameStats />
				<RecentGames />
			</main>
		</div>
	);
}
