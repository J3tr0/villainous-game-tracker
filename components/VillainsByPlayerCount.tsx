import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { villains } from '@/data/data';
import { games } from '@/data/games';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export default function VillainsByPlayerCount() {
	// Calcola le statistiche per ogni villain per ogni numero di giocatori
	const villainStatsByPlayerCount = games.reduce((acc, game) => {
		// Inizializza l'oggetto per questo numero di giocatori se non esiste
		if (!acc[game.numberOfPlayers]) {
			acc[game.numberOfPlayers] = {};
		}

		// Aggiorna le statistiche per ogni villain nella partita
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

	// Funzione per ottenere i top 5 villain per un dato numero di giocatori
	const getTopVillainsForPlayerCount = (playerCount: number) => {
		const stats = villainStatsByPlayerCount[playerCount] || {};
		return Object.entries(stats)
			.map(([id, { wins, total }]) => ({
				id,
				name: villains.find((v) => v.id === id)?.name || id,
				wins,
				total,
				winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0',
			}))
			.sort((a, b) => b.wins - a.wins || Number(b.winRate) - Number(a.winRate))
			.slice(0, 5);
	};

	const getVillainImage = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.img || '';
	};

	// Trova tutti i formati di gioco disponibili
	const playerCounts = [
		...new Set(games.map((game) => game.numberOfPlayers)),
	].sort();

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

				{playerCounts.map((count) => (
					<TabsContent
						key={count}
						value={count.toString()}>
						<Table>
							<TableCaption>
								I Villain con più vittorie per numero di giocatori.
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50%]">Villain</TableHead>
									<TableHead className="text-center">V</TableHead>
									<TableHead className="text-center">P</TableHead>
									<TableHead className="text-center">%</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{getTopVillainsForPlayerCount(count).map((villain) => (
									<TableRow key={villain.id}>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="size-8 rounded-sm">
													<AvatarImage src={getVillainImage(villain.id)} />
												</Avatar>
												<span className="truncate">{villain.name}</span>
											</div>
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
		</section>
	);
}
