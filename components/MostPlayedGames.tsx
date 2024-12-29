import { games } from '@/data/games';
import { formatPercentage, getPlayerCounts } from '@/lib/villainUtils';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export default function MostPlayedGames() {
	const playerCounts = getPlayerCounts();
	const totalGames = games.length;

	// Calcola il numero di partite per ogni numero di giocatori
	const playerCountStats = games.reduce((acc, game) => {
		acc[game.numberOfPlayers] = (acc[game.numberOfPlayers] || 0) + 1;
		return acc;
	}, {} as Record<number, number>);

	// Converti in array e ordina per numero di partite (decrescente)
	const sortedStats = playerCounts
		.map((count) => ({
			players: count,
			count: playerCountStats[count] || 0,
			percentage: formatPercentage(
				((playerCountStats[count] || 0) / totalGames) * 100
			),
		}))
		.sort((a, b) => b.count - a.count);

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Statistiche partite
				</span>
			</h2>
			<Table>
				<TableCaption>
					Distribuzione del numero di giocatori nelle partite.
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs uppercase">N. di giocatori</TableHead>
						<TableHead className="text-xs uppercase text-center">#</TableHead>
						<TableHead className="text-xs uppercase text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedStats.map((stat) => (
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
