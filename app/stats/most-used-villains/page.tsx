import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getMostUsedVillains, getVillainImage } from '@/lib/villainUtils';

export default function MostUsedVillainsPage() {
	const sortedVillains = getMostUsedVillains();

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Classifica utilizzo Villain
					</span>
				</h1>
				<Table>
					<TableCaption>
						Classifica completa dei Villain ordinata per numero di utilizzi.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Posizione</TableHead>
							<TableHead>Villain</TableHead>
							<TableHead className="text-center">N. di partite</TableHead>
							<TableHead className="text-center">% utilizzo</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedVillains.map((villain, index) => (
							<TableRow key={villain.id}>
								<TableCell className="font-medium">#{index + 1}</TableCell>
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
			</main>
		</div>
	);
}