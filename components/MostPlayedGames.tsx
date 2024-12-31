import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/db';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export default async function MostPlayedGames() {
	// Ottieni il totale delle partite
	const totalGames = await prisma.game.count();

	// Ottieni il conteggio delle partite per numero di giocatori
	const gamesByPlayerCount = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		_count: {
			id: true,
		},
		orderBy: {
			_count: {
				id: 'desc',
			},
		},
	});

	// Calcola le statistiche
	const stats = gamesByPlayerCount.map((stat) => ({
		players: stat.numberOfPlayers,
		count: stat._count.id,
		percentage: ((stat._count.id / totalGames) * 100).toFixed(1),
	}));

	return (
		<section>
			<div className="flex items-center justify-between gap-2 mb-4">
				<h2 className="text-2xl font-bold uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Statistiche partite
					</span>
				</h2>
				<Badge variant="secondary">{totalGames} partite</Badge>
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
