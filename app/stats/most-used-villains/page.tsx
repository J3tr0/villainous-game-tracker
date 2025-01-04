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
import { villains } from '@/data/data';
import { GameWithPlayers } from '@/lib/types';
import { getVillainID, getVillainImage } from '@/lib/villainUtils';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = async () => {
	const res = await fetch('/api/games/sheet');
	const data = await res.json();
	if (data.error) throw new Error(data.error);

	const villainStats = data.reduce(
		(acc: Record<string, number>, game: GameWithPlayers) => {
			game.players.forEach((player) => {
				if (player.villainId) {
					acc[player.villainId] = (acc[player.villainId] || 0) + 1;
				}
			});
			return acc;
		},
		{}
	);

	const values: number[] = Object.values(villainStats);
	const totalGames = values.reduce((a, b) => a + b, 0);

	const statsArray = Object.entries(villainStats as Record<string, number>).map(
		([id, count]) => {
			const villain = villains.find((v) => v.id === id || v.idGoogle === id);
			return {
				id,
				name: villain?.name || id,
				count,
				percentage: ((count / totalGames) * 100).toFixed(1),
			};
		}
	);

	return statsArray.sort((a, b) => b.count - a.count);
};

export default function MostUsedVillainsPage() {
	const { data: villains, error } = useSWR('most-used-villains', fetcher, {
		refreshInterval: 5000,
	});

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
							<TableHead className="text-center">
								% sul totale partite
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{villains.map((villain, index) => (
							<TableRow key={villain.id}>
								<TableCell>#{index + 1}</TableCell>
								<TableCell>
									<Link
										href={`/stats/villains/${getVillainID(villain.id)}`}
										className="flex items-center gap-2 hover:text-primary transition-colors">
										<Avatar className="size-8 rounded-sm">
											<AvatarImage
												src={getVillainImage(getVillainID(villain.id))}
											/>
										</Avatar>
										{villain.name}
									</Link>
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
