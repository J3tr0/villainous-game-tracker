import MostPlayedGames from './MostPlayedGames';
import MostUsedVillains from './MostUsedVillains';
import MostWinningVillains from './MostWinningVillains';
import VillainsByPlayerCount from './VillainsByPlayerCount';

export default function GameStats() {
	return (
		<section className="mt-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				<MostUsedVillains />
				<MostWinningVillains />
				<VillainsByPlayerCount />
				<MostPlayedGames />
			</div>
		</section>
	);
}
