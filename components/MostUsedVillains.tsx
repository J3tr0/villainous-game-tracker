import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getMostUsedVillains, getVillainImage } from '@/lib/villainUtils';
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
	const villains = getMostUsedVillains(5);

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
						<TableHead className="w-[50%]">Villain</TableHead>
						<TableHead className="text-center">#</TableHead>
						<TableHead className="text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{villains.map((villain) => (
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
								{villain.count}
							</TableCell>
							<TableCell className="text-center font-medium">
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