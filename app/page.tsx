import GameStats from '@/components/GameStats';
import { RecentGames } from '@/components/RecentGames';
import { getAllGames } from '@/lib/db/queries';
import { GameWithPlayers } from '@/lib/types';

export default async function Home() {
	const games = (await getAllGames()) as GameWithPlayers[];

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-4">
				<GameStats />
				<RecentGames games={games} />
			</main>
		</div>
	);
}
