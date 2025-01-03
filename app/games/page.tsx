'use client';

import { GamesPageClient } from '@/components/GamesPageClient';
import { GameWithPlayers } from '@/lib/types';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/games');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function GamesPage() {
	const { data: games, error } = useSWR<GameWithPlayers[]>('games', fetcher, {
		refreshInterval: 5000, // Aggiorna ogni 5 secondi
	});

	if (error) {
		return (
			<div className="text-muted-foreground">
				Errore nel caricamento dei dati
			</div>
		);
	}

	if (!games) {
		return <div className="text-muted-foreground">Caricamento...</div>;
	}

	return <GamesPageClient games={games} />;
}
