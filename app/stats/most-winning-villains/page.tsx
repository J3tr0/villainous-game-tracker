'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { villains } from '@/data/data';
import { GameWithPlayers } from '@/lib/types';
import { getVillainID, getVillainImage } from '@/lib/villainUtils';
import Link from 'next/link';
import useSWR from 'swr';

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
	).map(([id, stats]) => {
		const villain = villains.find((v) => v.id === id || v.idGoogle === id);
		return {
			id,
			name: villain?.name || id,
			wins: stats.wins,
			total: stats.total,
			winRate: ((stats.wins / stats.total) * 100).toFixed(1),
		};
	});

	// Ordina per percentuale vittorie decrescente
	return statsArray.sort((a, b) => Number(b.winRate) - Number(a.winRate));
};

export default function MostWinningVillainsPage() {
	const { data: villains, error } = useSWR('most-winning-villains', fetcher, {
		refreshInterval: 5000,
	});

	if (error)
		return (
			<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
		);
	if (!villains) return <p className="text-muted-foreground">Caricamento...</p>;

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Classifica vittorie Villain
					</span>
				</h1>
				<Table>
					<TableCaption>
						Classifica completa dei Villain ordinata per percentuale di
						vittorie.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Posizione</TableHead>
							<TableHead>Villain</TableHead>
							<TableHead className="text-center">Vittorie</TableHead>
							<TableHead className="text-center">Partite</TableHead>
							<TableHead className="text-center">% vittorie</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{villains.map((villain, index) => (
							<TableRow key={villain.id}>
								<TableCell className="font-medium">#{index + 1}</TableCell>
								<TableCell className="font-medium">
									<Link
										href={`/stats/villains/${getVillainID(villain.id)}`}
										className="flex items-center gap-2 hover:text-primary transition-colors">
										<Avatar className="size-8 rounded-sm">
											<AvatarImage
												src={getVillainImage(getVillainID(villain.id))}
											/>
										</Avatar>
										{villain.name}
									</Link>
								</TableCell>
								<TableCell className="text-center">{villain.wins}</TableCell>
								<TableCell className="text-center">{villain.total}</TableCell>
								<TableCell className="text-center">
									{villain.winRate}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</main>
		</div>
	);
}
