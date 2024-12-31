import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { villains } from '@/data/data';
import { prisma } from '@/lib/db';
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
	// Ottieni tutti i numeri di giocatori disponibili
	const playerCounts = await prisma.game
		.groupBy({
			by: ['numberOfPlayers'],
			orderBy: {
				numberOfPlayers: 'asc',
			},
		})
		.then((counts) => counts.map((c) => c.numberOfPlayers));

	// Funzione per ottenere le statistiche per un numero specifico di giocatori
	const getTopVillainsForPlayerCount = async (playerCount: number) => {
		const villainStats = await prisma.player.groupBy({
			by: ['villainId'],
			where: {
				game: {
					numberOfPlayers: playerCount,
				},
			},
			_count: {
				villainId: true,
			},
		});

		const statsWithWins = await Promise.all(
			villainStats.map(async (stat) => {
				const wins = await prisma.player.count({
					where: {
						villainId: stat.villainId,
						isWinner: true,
						game: {
							numberOfPlayers: playerCount,
						},
					},
				});

				return {
					id: stat.villainId,
					name: villains.find((v) => v.id === stat.villainId)?.name,
					wins,
					total: stat._count.villainId,
					winRate: ((wins / stat._count.villainId) * 100).toFixed(1),
				};
			})
		);

		return statsWithWins.sort((a, b) => b.wins - a.wins).slice(0, 5);
	};

	// Ottieni le statistiche per ogni numero di giocatori
	const statsByPlayerCount = await Promise.all(
		playerCounts.map(async (count) => ({
			count,
			stats: await getTopVillainsForPlayerCount(count),
		}))
	);

	return (
		<section>
			<h2 className="text-2xl font-bold uppercase mb-4">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Statistiche per numero di giocatori
				</span>
			</h2>
			<Tabs
				defaultValue={playerCounts[0].toString()}
				className="w-full">
				<TabsList className="grid w-full grid-cols-5 mb-4">
					{playerCounts.map((count) => (
						<TabsTrigger
							key={count}
							value={count.toString()}>
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
									<TableHead className="w-[50%]">Villain</TableHead>
									<TableHead className="text-center">V</TableHead>
									<TableHead className="text-center">P</TableHead>
									<TableHead className="text-center">%</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{stats.map((villain) => (
									<TableRow key={villain.id}>
										<TableCell className="font-medium">
											<Link
												href={`/stats/villains/${villain.id}`}
												className="flex items-center gap-2 hover:text-primary transition-colors">
												<Avatar className="size-8 rounded-sm">
													<AvatarImage
														src={villains.find((v) => v.id === villain.id)?.img}
													/>
												</Avatar>
												<span className="truncate">{villain.name}</span>
											</Link>
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
}
