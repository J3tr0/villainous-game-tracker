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

export default function MostUsedVillains() {
	// Calcola il numero totale di "slot giocatore" in tutte le partite
	const totalPlays = games.reduce((sum, game) => sum + game.players.length, 0);

	// Calcola il numero di partite per ogni villain
	const villainUsage = games.reduce((acc, game) => {
		game.players.forEach((player) => {
			acc[player.villainId] = (acc[player.villainId] || 0) + 1;
		});
		return acc;
	}, {} as Record<string, number>);

	// Crea array di oggetti con id, conteggio e percentuale
	const sortedVillains = Object.entries(villainUsage)
		.map(([id, count]) => ({
			id,
			count,
			name: villains.find((v) => v.id === id)?.name || id,
			percentage: ((count / totalPlays) * 100).toFixed(1),
		}))
		.sort((a, b) => b.count - a.count)
		.slice(0, 5);

	const getVillainImage = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.img || villainId;
	};

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Top 5 villain più usati
				</span>
			</h2>
			<Table>
				<TableCaption>I Villain più usati nelle partite.</TableCaption>
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
							<TableCell className="text-center">{villain.count}</TableCell>
							<TableCell className="text-center">
								{villain.percentage}%
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="mt-4">
				<Link
					href="/stats/most-used-villains"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
					Vedi classifica completa
					<ArrowRight className="ml-2 h-4 w-4" />
				</Link>
			</div>
		</section>
	);
}
