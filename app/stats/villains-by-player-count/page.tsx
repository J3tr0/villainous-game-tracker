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
import { games } from '@/data/games';

export default function VillainsByPlayerCountPage() {
	// Calcola le statistiche per ogni villain per ogni numero di giocatori
	const villainStatsByPlayerCount = games.reduce((acc, game) => {
		if (!acc[game.numberOfPlayers]) {
			acc[game.numberOfPlayers] = {};
		}

		game.players.forEach((player) => {
			if (!acc[game.numberOfPlayers][player.villainId]) {
				acc[game.numberOfPlayers][player.villainId] = { wins: 0, total: 0 };
			}
			acc[game.numberOfPlayers][player.villainId].total += 1;
			if (player.isWinner) {
				acc[game.numberOfPlayers][player.villainId].wins += 1;
			}
		});
		return acc;
	}, {} as Record<number, Record<string, { wins: number; total: number }>>);

	// Funzione per ottenere tutti i villain per un dato numero di giocatori
	const getVillainsForPlayerCount = (playerCount: number) => {
		const stats = villainStatsByPlayerCount[playerCount] || {};
		return Object.entries(stats)
			.map(([id, { wins, total }]) => ({
				id,
				name: villains.find((v) => v.id === id)?.name || id,
				wins,
				total,
				winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0',
			}))
			.sort((a, b) => b.wins - a.wins || Number(b.winRate) - Number(a.winRate));
	};

	const getVillainImage = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.img || '';
	};

	const playerCounts = [
		...new Set(games.map((game) => game.numberOfPlayers)),
	].sort();

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
											<TableCell className="font-medium flex items-center gap-2">
												<Avatar className="size-8 rounded-sm">
													<AvatarImage src={getVillainImage(villain.id)} />
												</Avatar>
												{villain.name}
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
