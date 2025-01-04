'use client';

import { VillainLink } from '@/components/VillainLink';
import { GameWithPlayers } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

const fetcher = async () => {
	const res = await fetch('/api/games/sheet');
	const data = await res.json();
	if (data.error) throw new Error(data.error);

	// Calcola le statistiche delle vittorie dei villain
	const villainStats = data.reduce(
		(
			acc: Record<string, { wins: number; total: number }>,
			game: GameWithPlayers
		) => {
			game.players.forEach((player) => {
				if (player.villainId) {
					if (!acc[player.villainId]) {
						acc[player.villainId] = { wins: 0, total: 0 };
					}
					acc[player.villainId].total++;
					if (player.isWinner) {
						acc[player.villainId].wins++;
					}
				}
			});
			return acc;
		},
		{}
	);

	// Converti in array e calcola le percentuali
	const statsArray = Object.entries(
		villainStats as Record<string, { wins: number; total: number }>
	).map(([id, stats]) => ({
		id,
		wins: stats.wins,
		total: stats.total,
		winRate: ((stats.wins / stats.total) * 100).toFixed(1),
	}));

	// Ordina per percentuale vittorie decrescente
	return statsArray.sort((a, b) => Number(b.winRate) - Number(a.winRate));
};

export default function MostWinningVillains() {
	const { data: villainStats, error } = useSWR(
		'most-winning-villains',
		fetcher,
		{
			refreshInterval: 30000,
		}
	);

	if (error) {
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più vincenti
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);
	}

	if (!villainStats) {
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più vincenti
					</span>
				</h2>
				<p className="text-muted-foreground">Caricamento...</p>
			</section>
		);
	}

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Top 5 villain più vincenti
				</span>
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50%]">Villain</TableHead>
						<TableHead className="text-center">V</TableHead>
						<TableHead className="text-center">#</TableHead>
						<TableHead className="text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{villainStats.slice(0, 5).map((villain) => (
						<TableRow
							key={villain.id}
							className="hover:bg-gradient-to-tl hover:from-pink-500/25 hover:to-indigo-800/25">
							<TableCell className="font-medium">
								<VillainLink
									villainId={villain.id}
									className="flex items-center gap-2 hover:text-primary transition-colors"
								/>
							</TableCell>
							<TableCell className="text-center font-medium">
								{villain.wins}
							</TableCell>
							<TableCell className="text-center text-muted-foreground">
								{villain.total}
							</TableCell>
							<TableCell className="text-center font-medium">
								{villain.winRate}%
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="mt-4">
				<Link
					href="/stats/most-winning-villains"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
					Vedi classifica completa
					<ArrowRight className="ml-2 h-4 w-4" />
				</Link>
			</div>
		</section>
	);
}
