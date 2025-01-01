'use client';

import { VillainLink } from '@/components/VillainLink';
import { VillainUsageStats } from '@/lib/types';
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
	const res = await fetch('/api/villains/most-used/top');
	const data = await res.json();
	if (data.error) throw new Error(data.error);
	return data;
};

export default function MostUsedVillains() {
	const { data: villainStats, error } = useSWR(
		'most-used-villains-top',
		fetcher,
		{
			refreshInterval: 5000,
		}
	);

	if (error)
		return (
			<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
		);
	if (!villainStats)
		return <p className="text-muted-foreground">Caricamento...</p>;

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4 uppercase">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Top 5 villain più usati
				</span>
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50%]">Villain</TableHead>
						<TableHead className="text-center">#</TableHead>
						<TableHead className="text-center">%</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{villainStats.map((villain: VillainUsageStats) => (
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
