'use client';

import { VillainLink } from '@/components/VillainLink';
import { VillainStats } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

const fetcher = async () => {
	const res = await fetch('/api/villains/most-winning/top');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function MostWinningVillains() {
	const { data: villainStats, error } = useSWR<VillainStats[]>(
		'most-winning-villains-top',
		fetcher,
		{
			refreshInterval: 5000,
		}
	);

	if (error)
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più vincenti
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);

	if (!villainStats)
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più vincenti
					</span>
				</h2>
				<p className="text-muted-foreground">Caricamento...</p>
			</section>
		);

	if (!villainStats.length) {
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più vincenti
					</span>
				</h2>
				<p className="text-muted-foreground">Nessuna partita disponibile</p>
			</section>
		);
	}

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
						<TableHead className="text-center">#</TableHead>
						<TableHead className="text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{villainStats.map((villain) => (
						<TableRow
							key={villain.id}
							className="hover:bg-gradient-to-tl hover:from-pink-500/25 hover:to-indigo-800/25">
							<TableCell className="font-medium">
								<VillainLink
									villainId={villain.id}
									className="flex items-center gap-2 hover:text-primary transition-colors"
								/>
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
