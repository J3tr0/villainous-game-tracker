import { VillainLink } from '@/components/VillainLink';
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

export default async function MostUsedVillains() {
	try {
		// Ottieni il totale delle partite
		const totalGames = await prisma.player.count();

		// Se non ci sono partite, mostra un messaggio
		if (!totalGames) {
			return (
				<section>
					<h2 className="text-2xl font-bold mb-4 uppercase">
						<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
							Top 5 villain più usati
						</span>
					</h2>
					<p className="text-muted-foreground">Nessuna partita disponibile</p>
				</section>
			);
		}

		// Ottieni i villain più usati
		const mostUsed =
			(await prisma.player.groupBy({
				by: ['villainId'],
				_count: {
					villainId: true,
				},
				orderBy: {
					_count: {
						villainId: 'desc',
					},
				},
				take: 5,
			})) || [];

		// Calcola le statistiche
		const villainStats = mostUsed.map((villain) => ({
			id: villain.villainId,
			name: villains.find((v) => v.id === villain.villainId)?.name,
			count: villain._count.villainId,
			percentage: ((villain._count.villainId / totalGames) * 100).toFixed(1),
		}));

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
	} catch (error) {
		console.error('Error in MostUsedVillains:', error);
		return (
			<section>
				<h2 className="text-2xl font-bold mb-4 uppercase">
					<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
						Top 5 villain più usati
					</span>
				</h2>
				<p className="text-muted-foreground">Errore nel caricamento dei dati</p>
			</section>
		);
	}
}
