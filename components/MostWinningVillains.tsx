import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { villains } from '@/data/data';
import { games } from '@/data/games';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export default function MostWinningVillains() {
	// Calcola vittorie e partite totali per ogni villain
	const villainStats = games.reduce((acc, game) => {
		game.players.forEach((player) => {
			if (!acc[player.villainId]) {
				acc[player.villainId] = { wins: 0, total: 0 };
			}
			acc[player.villainId].total += 1;
			if (player.isWinner) {
				acc[player.villainId].wins += 1;
			}
		});
		return acc;
	}, {} as Record<string, { wins: number; total: number }>);

	// Crea array di oggetti con statistiche
	const sortedVillains = Object.entries(villainStats)
		.map(([id, stats]) => ({
			id,
			name: villains.find((v) => v.id === id)?.name || id,
			wins: stats.wins,
			total: stats.total,
			winRate: ((stats.wins / stats.total) * 100).toFixed(1),
		}))
		.sort((a, b) => b.wins - a.wins)
		.slice(0, 5);

	const getVillainImage = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.img || villainId;
	};

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Top 5 villain più vincenti
				</span>
			</h2>
			<Table>
				<TableCaption>I Villain con più vittorie.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs uppercase">Villain</TableHead>
						<TableHead className="text-xs uppercase text-center">#</TableHead>
						<TableHead className="text-xs uppercase text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedVillains.map((villain) => (
						<TableRow key={villain.id}>
							<TableCell className="font-medium flex items-center gap-2">
								<Avatar className="size-8 rounded-sm">
									<AvatarImage src={getVillainImage(villain.id)} />
								</Avatar>
								{villain.name}
							</TableCell>
							<TableCell className="text-center">{villain.wins}</TableCell>
							<TableCell className="text-center">{villain.winRate}%</TableCell>
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
