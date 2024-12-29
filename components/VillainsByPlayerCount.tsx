import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	formatPercentage,
	getPlayerCounts,
	getVillainImage,
	getVillainName,
	getVillainStatsByPlayerCount,
	sortVillainsByWins,
} from '@/lib/villainUtils';
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

export default function VillainsByPlayerCount() {
	const villainStatsByPlayerCount = getVillainStatsByPlayerCount();
	const playerCounts = getPlayerCounts();

	const getTopVillainsForPlayerCount = (playerCount: number) => {
		const stats = villainStatsByPlayerCount[playerCount] || {};
		return sortVillainsByWins(
			Object.entries(stats).map(([id, { wins, total }]) => ({
				id,
				name: getVillainName(id),
				wins,
				total,
				winRate: total > 0 ? formatPercentage((wins / total) * 100) : '0.0',
			}))
		).slice(0, 5);
	};

	return (
		<section>
			<h2 className="text-2xl font-bold uppercase mb-4">
				<span className="bg-clip-text text-transparent bg-gradient-to-tl from-pink-500 to-indigo-800">
					Statistiche per numero di giocatori
				</span>
			</h2>
			<Tabs
				defaultValue={playerCounts[0].toString()}
				className="w-full">
				<TabsList className="grid w-full grid-cols-5 mb-4">
					{playerCounts.map((count) => (
						<TabsTrigger
							key={count}
							value={count.toString()}>
							{count} <span className="hidden sm:inline ml-1">giocatori</span>
						</TabsTrigger>
					))}
				</TabsList>

				{playerCounts.map((count) => (
					<TabsContent
						key={count}
						value={count.toString()}>
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
								{getTopVillainsForPlayerCount(count).map((villain) => (
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
					</TabsContent>
				))}
			</Tabs>
			<div className="mt-4">
				<Link
					href="/stats/villains-by-player-count"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
					Vedi statistiche complete
					<ArrowRight className="ml-2 h-4 w-4" />
				</Link>
			</div>
		</section>
	);
}
