import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { villains } from '@/data/data';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { notFound } from 'next/navigation';

interface PageProps {
	params: { id: string };
}

export default async function VillainStatsPage({ params }: PageProps) {
	const { id } = await params;

	const villain = villains.find((v) => v.id === id);
	if (!villain) {
		notFound();
	}

	const gamesData = await prisma.player.findMany({
		where: {
			villainId: id,
		},
		select: {
			isWinner: true,
			game: {
				select: {
					date: true,
					numberOfPlayers: true,
					players: {
						select: {
							villainId: true,
							isWinner: true,
						},
					},
				},
			},
		},
		orderBy: {
			game: {
				date: 'desc',
			},
		},
	});

	// Calcolo statistiche base
	const totalGames = gamesData.length;
	const wins = gamesData.filter((game) => game.isWinner).length;
	const lastGame = gamesData[0]?.game;

	// Calcolo statistiche per numero di giocatori
	const statsByPlayerCount = Array.from(
		new Set(gamesData.map((g) => g.game.numberOfPlayers))
	)
		.sort((a, b) => a - b)
		.map((playerCount) => {
			const gamesWithCount = gamesData.filter(
				(g) => g.game.numberOfPlayers === playerCount
			);
			const total = gamesWithCount.length;
			const wins = gamesWithCount.filter((g) => g.isWinner).length;
			return {
				playerCount,
				total,
				wins,
				winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0',
			};
		});

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<div className="flex items-center gap-4 mb-8">
					<Avatar className="size-16 rounded-sm">
						<AvatarImage src={villain.img} />
					</Avatar>
					<h1 className="text-2xl font-bold mb-0">{villain.name}</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<Card>
						<CardHeader>
							<CardTitle>Partite Giocate</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{totalGames}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Vittorie</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">{wins}</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>% Vittorie</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{((wins / totalGames) * 100).toFixed(1)}%
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Ultima Partita</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{lastGame
								? format(lastGame.date, 'dd MMM yyyy', { locale: it })
								: 'N/A'}
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Statistiche per Numero di Giocatori</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Giocatori</TableHead>
									<TableHead className="text-center">Partite</TableHead>
									<TableHead className="text-center">Vittorie</TableHead>
									<TableHead className="text-center">% Vittorie</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{statsByPlayerCount.map((stat) => (
									<TableRow key={stat.playerCount}>
										<TableCell>{stat.playerCount}</TableCell>
										<TableCell className="text-center">{stat.total}</TableCell>
										<TableCell className="text-center">{stat.wins}</TableCell>
										<TableCell className="text-center">
											{stat.winRate}%
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
