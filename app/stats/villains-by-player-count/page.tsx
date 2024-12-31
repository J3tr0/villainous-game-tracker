import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { villains } from '@/data/data';
import {
	formatPercentage,
	getPlayerCounts,
	getVillainImage,
	getVillainName,
	getVillainStatsByPlayerCount,
} from '@/lib/villainUtils';
import Link from 'next/link';

export default async function VillainsByPlayerCountPage() {
	const playerCounts = await getPlayerCounts();
	const villainStats = await Promise.all(
		villains.map(async (villain) => ({
			id: villain.id,
			stats: await getVillainStatsByPlayerCount(villain.id),
		}))
	);

	// Funzione per ottenere tutti i villain per un dato numero di giocatori
	const getVillainsForPlayerCount = (playerCount: number) => {
		return villainStats
			.map(({ id, stats }) => {
				const playerStats = stats.find(
					([players]) => players === playerCount
				) || [0, 0, 0];
				const [, total, wins] = playerStats;
				return {
					id,
					name: getVillainName(id),
					wins,
					total,
					winRate: total > 0 ? formatPercentage(wins, total) : '0.0',
				};
			})
			.sort((a, b) => b.wins - a.wins);
	};

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche complete per numero di giocatori
					</span>
				</h1>
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

					{playerCounts.map((count) => (
						<TabsContent
							key={count}
							value={count.toString()}>
							<Table>
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
									{getVillainsForPlayerCount(count).map((villain, index) => (
										<TableRow key={villain.id}>
											<TableCell className="font-medium">
												#{index + 1}
											</TableCell>
											<TableCell className="font-medium">
												<Link
													href={`/stats/villains/${villain.id}`}
													className="flex items-center gap-2 hover:text-primary transition-colors">
													<Avatar className="size-8 rounded-sm">
														<AvatarImage src={getVillainImage(villain.id)} />
													</Avatar>
													{villain.name}
												</Link>
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
