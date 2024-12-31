import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VillainLink } from '@/components/VillainLink';
import { prisma } from '@/lib/db';
import { getVillainName } from '@/lib/villainUtils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export default async function VillainsByPlayerCount() {
	try {
		// Ottieni i numeri di giocatori disponibili
		const playerCounts = await prisma.game.groupBy({
			by: ['numberOfPlayers'],
			orderBy: { numberOfPlayers: 'asc' },
		});

		// Per ogni numero di giocatori, ottieni tutte le statistiche in due query
		const statsByPlayerCount = await Promise.all(
			playerCounts.map(async ({ numberOfPlayers }) => {
				// Query per i totali
				const totals = await prisma.player.groupBy({
					by: ['villainId'],
					where: { game: { numberOfPlayers } },
					_count: { villainId: true },
				});

				// Query per le vittorie
				const wins = await prisma.player.groupBy({
					by: ['villainId'],
					where: {
						game: { numberOfPlayers },
						isWinner: true,
					},
					_count: { villainId: true },
				});

				// Calcola le statistiche
				const stats = totals
					.map((total) => {
						const win = wins.find((w) => w.villainId === total.villainId);
						const winRate =
							((win?._count.villainId ?? 0) / total._count.villainId) * 100;
						return {
							id: total.villainId,
							name: getVillainName(total.villainId),
							total: total._count.villainId,
							wins: win?._count.villainId ?? 0,
							winRate: winRate.toFixed(1),
						};
					})
					.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate))
					.slice(0, 5);

				return { count: numberOfPlayers, stats };
			})
		);

		return (
			<section>
				<h2 className="text-2xl font-bold uppercase mb-4">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche per numero di giocatori
					</span>
				</h2>
				<Tabs
					defaultValue={playerCounts[0]?.numberOfPlayers?.toString() || '0'}
					className="w-full">
					<TabsList className="grid w-full grid-cols-5 mb-4 rounded-sm">
						{playerCounts.map(({ numberOfPlayers }) => (
							<TabsTrigger
								key={numberOfPlayers}
								value={numberOfPlayers.toString()}
								className="rounded-sm">
								{numberOfPlayers}{' '}
								<span className="hidden sm:inline ml-1">giocatori</span>
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
										<TableHead className="w-[50%]">Villain</TableHead>
										<TableHead className="text-center">V</TableHead>
										<TableHead className="text-center">#</TableHead>
										<TableHead className="text-center">%</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stats.map((villain) => (
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
						</TabsContent>
					))}
				</Tabs>
				<div className="mt-4">
					<Link
						href="/stats/villains-by-player-count"
						className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
						Vedi statistiche complete
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</div>
			</section>
		);
	} catch (error) {
		console.error('Error in VillainsByPlayerCount:', error);
		return (
			<section>
				<h2 className="text-2xl font-bold uppercase mb-4">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche per numero di giocatori
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);
	}
}
