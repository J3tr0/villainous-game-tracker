'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VillainLink } from '@/components/VillainLink';
import { GameWithPlayers } from '@/lib/types';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/games/sheet');
	const data = await res.json();
	if (data.error) throw new Error(data.error);

	// Raggruppa le partite per numero di giocatori
	const gamesByPlayerCount = data.reduce(
		(acc: Record<number, GameWithPlayers[]>, game: GameWithPlayers) => {
			const count = game.players.length;
			if (!acc[count]) acc[count] = [];
			acc[count].push(game);
			return acc;
		},
		{}
	);

	// Calcola le statistiche per ogni gruppo
	return Object.entries(gamesByPlayerCount)
		.map(([count, games]) => {
			// Calcola le statistiche dei villain per questo numero di giocatori
			const villainStats = (games as GameWithPlayers[]).reduce(
				(acc: Record<string, { wins: number; total: number }>, game) => {
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
			const stats = Object.entries(villainStats)
				.map(([id, stats]) => ({
					id,
					wins: stats.wins,
					total: stats.total,
					winRate: ((stats.wins / stats.total) * 100).toFixed(1),
				}))
				.sort((a, b) => Number(b.winRate) - Number(a.winRate));

			return {
				count: Number(count),
				stats,
			};
		})
		.sort((a, b) => a.count - b.count);
};

export default function VillainsByPlayerCountPage() {
	const { data: statsByPlayerCount, error } = useSWR(
		'villains-by-player-count',
		fetcher,
		{
			refreshInterval: 30000,
		}
	);

	if (error)
		return (
			<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
		);
	if (!statsByPlayerCount)
		return <p className="text-muted-foreground">Caricamento...</p>;

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche complete per numero di giocatori
					</span>
				</h1>
				<Tabs defaultValue={statsByPlayerCount[0]?.count?.toString()}>
					<TabsList className="grid w-full grid-cols-5 mb-4 rounded-sm">
						{statsByPlayerCount.map(({ count }) => (
							<TabsTrigger
								key={count}
								value={count.toString()}
								className="rounded-sm">
								{count} <span className="hidden sm:inline ml-1">giocatori</span>
							</TabsTrigger>
						))}
					</TabsList>

					{statsByPlayerCount.map(({ count, stats }) => (
						<TabsContent
							key={count}
							value={count.toString()}>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Villain</TableHead>
										<TableHead className="text-center">Vittorie</TableHead>
										<TableHead className="text-center">Partite</TableHead>
										<TableHead className="text-center">% vittorie</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stats.map((villain) => (
										<TableRow key={villain.id}>
											<TableCell className="font-medium">
												<VillainLink
													villainId={villain.id}
													className="flex items-center gap-2 hover:text-primary transition-colors"
												/>
											</TableCell>
											<TableCell className="text-center">
												{villain.wins}
											</TableCell>
											<TableCell className="text-center">
												{villain.total}
											</TableCell>
											<TableCell className="text-center">
												{villain.winRate}%
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
					))}
				</Tabs>
			</main>
		</div>
	);
}
