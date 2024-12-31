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

export default async function MostWinningVillains() {
	try {
		// Ottieni tutti i totali in una query
		const totalGames = await prisma.player.groupBy({
			by: ['villainId'],
			_count: true,
		});

		// Ottieni tutte le vittorie in una query
		const winningGames = await prisma.player.groupBy({
			by: ['villainId'],
			where: { isWinner: true },
			_count: true,
		});

		// Calcola le statistiche
		const villainStats = totalGames
			.map((v) => {
				const wins =
					winningGames.find((w) => w.villainId === v.villainId)?._count ?? 0;
				return {
					id: v.villainId,
					name: villains.find((vil) => vil.id === v.villainId)?.name,
					total: v._count,
					wins,
					winRate: ((wins / v._count) * 100).toFixed(1),
				};
			})
			.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate))
			.slice(0, 5);

		// Se non ci sono vincitori, mostra un messaggio
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
	} catch (error) {
		console.error('Error in MostWinningVillains:', error);
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
	}
}
