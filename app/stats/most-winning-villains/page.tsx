'use client';

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
import { VillainStats } from '@/lib/types';
import { getVillainImage } from '@/lib/villainUtils';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/villains/most-winning');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function MostWinningVillainsPage() {
	const { data: villains, error } = useSWR<VillainStats[]>(
		'most-winning-villains',
		fetcher,
		{
			refreshInterval: 5000,
		}
	);

	if (error)
		return (
			<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
		);
	if (!villains) return <p className="text-muted-foreground">Caricamento...</p>;

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
						{villains.map((villain, index) => (
							<TableRow key={villain.id}>
								<TableCell className="font-medium">#{index + 1}</TableCell>
								<TableCell className="font-medium">
									<Link
										href={`/stats/villains/${villain.id}`}
										className="flex items-center gap-2 hover:text-primary transition-colors">
										<Avatar className="size-8 rounded-sm">
											<AvatarImage src={getVillainImage(villain.id)} />
										</Avatar>
										{villain.name}
									</Link>
								</TableCell>
								<TableCell className="text-center">{villain.wins}</TableCell>
								<TableCell className="text-center">{villain.total}</TableCell>
								<TableCell className="text-center">{villain.winRate}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</main>
		</div>
	);
}
