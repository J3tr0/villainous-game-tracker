'use client';

import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

type GameStats = {
	players: number;
	count: number;
	percentage: string;
	totalGames: number;
};

const fetcher = async () => {
	const res = await fetch('/api/games/most-played');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function MostPlayedGames() {
	const { data: stats, error } = useSWR<GameStats[]>(
		'most-played-games',
		fetcher,
		{
			refreshInterval: 5000,
		}
	);

	if (error) {
		return (
			<section>
				<h2 className="text-2xl font-bold uppercase mb-4">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche partite
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);
	}

	if (!stats) {
		return (
			<section>
				<h2 className="text-2xl font-bold uppercase mb-4">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche partite
					</span>
				</h2>
				<p className="text-muted-foreground">Caricamento...</p>
			</section>
		);
	}

	if (!stats.length) {
		return (
			<section>
				<h2 className="text-2xl font-bold uppercase mb-4">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche partite
					</span>
				</h2>
				<p className="text-muted-foreground">Nessuna partita disponibile</p>
			</section>
		);
	}

	return (
		<section>
			<div className="flex items-center justify-between gap-2 mb-4">
				<h2 className="text-2xl font-bold uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche partite
					</span>
				</h2>
				<Badge variant="secondary">{stats[0].totalGames} partite</Badge>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs uppercase">N. di giocatori</TableHead>
						<TableHead className="text-xs uppercase text-center">#</TableHead>
						<TableHead className="text-xs uppercase text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{stats.map((stat) => (
						<TableRow key={stat.players}>
							<TableCell className="font-medium">
								{stat.players} giocatori
							</TableCell>
							<TableCell className="text-center">{stat.count}</TableCell>
							<TableCell className="text-center">{stat.percentage}%</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
