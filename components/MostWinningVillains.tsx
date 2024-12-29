import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getMostWinningVillains, getVillainImage } from '@/lib/villainUtils';
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

export default function MostWinningVillains() {
	const villains = getMostWinningVillains(5);

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
					{villains.map((villain) => (
						<TableRow key={villain.id}>
							<TableCell className="font-medium">
								<Link
									href={`/stats/villains/${villain.id}`}
									className="flex items-center gap-2 hover:text-primary transition-colors">
									<Avatar className="size-8 rounded-sm">
										<AvatarImage src={getVillainImage(villain.id)} />
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
