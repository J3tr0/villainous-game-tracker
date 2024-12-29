import GameStats from '@/components/GameStats';
import { RecentGames } from '@/components/RecentGames';

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-4">
				<GameStats />
				<RecentGames />
			</main>
		</div>
	);
}
