import { Avatar, AvatarImage } from '@/components/ui/avatar';
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

export default async function MostWinningVillains() {
	const winners = await prisma.player.groupBy({
		by: ['villainId'],
		where: {
			isWinner: true,
		},
		_count: {
			villainId: true,
		},
		orderBy: {
			_count: {
				villainId: 'desc',
			},
		},
		take: 5,
	});

	// Ottieni il totale delle partite per ogni villain
	const totals = await Promise.all(
		winners.map(async (winner) => {
			const total = await prisma.player.count({
				where: {
					villainId: winner.villainId,
				},
			});
			return {
				id: winner.villainId,
				wins: winner._count.villainId,
				total,
				winRate: ((winner._count.villainId / total) * 100).toFixed(1),
				name: villains.find(v => v.id === winner.villainId)?.name,
			};
		})
	);

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Top 5 villain più vincenti
				</span>
			</h2>
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
					{totals.map((villain) => (
						<TableRow key={villain.id}>
							<TableCell className="font-medium">
								<Link
									href={`/stats/villains/${villain.id}`}
									className="flex items-center gap-2 hover:text-primary transition-colors">
									<Avatar className="size-8 rounded-sm">
										<AvatarImage src={villains.find(v => v.id === villain.id)?.img} />
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
