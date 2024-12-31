import GameStats from '@/components/GameStats';
import { RecentGames } from '@/components/RecentGames';
import { prisma } from '@/lib/db';
import { GameWithPlayers } from '@/lib/types';

export default async function Home() {
	try {
		const games = await prisma.game.findMany({
			include: {
				players: true,
			},
			orderBy: {
				date: 'desc',
			},
		});

		// Se non ci sono partite, restituisci subito la UI vuota
		if (!games || games.length === 0) {
			return (
				<div className="flex flex-col min-h-screen">
					<main className="flex-grow p-4">
						<GameStats />
						<RecentGames games={[]} />
					</main>
				</div>
			);
		}

		// Procedi con la validazione solo se ci sono partite
		const validGames = games.map((game) => ({
			...game,
			date: game.date instanceof Date ? game.date : new Date(game.date),
			players: game.players || [],
		})) as GameWithPlayers[];

		return (
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow p-4">
					<GameStats />
					<RecentGames games={validGames} />
				</main>
			</div>
		);
	} catch (error) {
		console.error('Error fetching games:', error);
		return (
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow p-4">
					<GameStats />
					<RecentGames games={[]} />
				</main>
			</div>
		);
	}
}
