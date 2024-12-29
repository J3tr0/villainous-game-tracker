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
import {
	formatDate,
	getVillainGamesByPlayerCount,
	getVillainImage,
	getVillainName,
	getVillainStats,
} from '@/lib/villainUtils';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		id: string;
	};
};

export default async function VillainStatsPage({ params }: Props) {
	const { id } = await params;
	const villainName = getVillainName(id);

	// Se il villain non esiste, mostra la pagina 404
	if (villainName === id) {
		notFound();
	}

	const stats = getVillainStats(id);
	const gamesByPlayerCount = getVillainGamesByPlayerCount(id);
	const villainImage = getVillainImage(id);

	return (
		<div className="flex flex-col min-h-screen mt-8">
			<main className="flex-grow p-4">
				<div className="flex items-center gap-4 mb-8">
					<Avatar className="size-16 rounded-sm">
						<AvatarImage src={villainImage} />
					</Avatar>
					<h1 className="text-2xl font-bold mb-0">{villainName}</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<Card>
						<CardHeader>
							<CardTitle>Partite Giocate</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{stats.totalGames}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Vittorie</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{stats.wins}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>% Vittorie</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{stats.winRate}%
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Ultima Partita</CardTitle>
						</CardHeader>
						<CardContent className="text-2xl font-bold">
							{formatDate(stats.lastPlayed)}
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
								{gamesByPlayerCount.map((stat) => (
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
