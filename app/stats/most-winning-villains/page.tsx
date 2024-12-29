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
import { getMostWinningVillains, getVillainImage } from '@/lib/villainUtils';

export default function MostWinningVillainsPage() {
	const sortedVillains = getMostWinningVillains();

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<h1 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Classifica vittorie Villain
					</span>
				</h1>
				<Table>
					<TableCaption>
						Classifica completa dei Villain ordinata per numero di vittorie.
					</TableCaption>
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
						{sortedVillains.map((villain, index) => (
							<TableRow key={villain.id}>
								<TableCell className="font-medium">#{index + 1}</TableCell>
								<TableCell className="font-medium flex items-center gap-2">
									<Avatar className="size-8 rounded-sm">
										<AvatarImage src={getVillainImage(villain.id)} />
									</Avatar>
									{villain.name}
								</TableCell>
								<TableCell className="text-center">{villain.wins}</TableCell>
								<TableCell className="text-center">{villain.total}</TableCell>
								<TableCell className="text-center">
									{villain.winRate}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</main>
		</div>
	);
}
