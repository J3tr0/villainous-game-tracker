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

type Props = {
	params: {
		id: string;
	};
};

export default async function VillainStatsPage({ params }: Props) {
	const { id } = params;
	const villain = villains.find((v) => v.id === id);

	if (!villain) {
		notFound();
	}

	// Statistiche generali
	const totalGames = await prisma.player.count({
		where: { villainId: id },
	});

	const wins = await prisma.player.count({
		where: {
			villainId: id,
			isWinner: true,
		},
	});

	const lastGame = await prisma.game.findFirst({
		where: {
			players: {
				some: { villainId: id },
			},
		},
		orderBy: { date: 'desc' },
	});

	// Statistiche per numero di giocatori
	const gamesByPlayerCount = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		where: {
			players: {
				some: { villainId: id },
			},
		},
		_count: {
			id: true,
		},
		orderBy: {
			numberOfPlayers: 'asc',
		},
	});

	const statsByPlayerCount = await Promise.all(
		gamesByPlayerCount.map(async (stat) => {
			const wins = await prisma.player.count({
				where: {
					villainId: id,
					isWinner: true,
					game: {
						numberOfPlayers: stat.numberOfPlayers,
					},
				},
			});

			return {
				playerCount: stat.numberOfPlayers,
				total: stat._count.id,
				wins,
				winRate: ((wins / stat._count.id) * 100).toFixed(1),
			};
		})
	);

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
