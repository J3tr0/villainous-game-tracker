import MostPlayedGames from '@/components/MostPlayedGames';
import MostUsedVillains from '@/components/MostUsedVillains';
import MostWinningVillains from '@/components/MostWinningVillains';
import VillainsByPlayerCount from '@/components/VillainsByPlayerCount';
import { Suspense } from 'react';

export default function GameStats() {
	return (
		<section className="mt-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				<Suspense fallback={<div>Caricamento...</div>}>
					<MostUsedVillains />
					<MostWinningVillains />
					<VillainsByPlayerCount />
					<MostPlayedGames />
				</Suspense>
			</div>
		</section>
	);
}
