import { villains } from '@/data/data';
import { games } from '@/data/games';

/**
 * Ottiene il nome di un villain dal suo ID
 */
export const getVillainName = (villainId: string): string => {
	return villains.find((v) => v.id === villainId)?.name || villainId;
};

/**
 * Ottiene l'immagine di un villain dal suo ID
 */
export const getVillainImage = (villainId: string): string => {
	return villains.find((v) => v.id === villainId)?.img || '';
};

/**
 * Calcola le statistiche dei villain per numero di giocatori
 */
export const getVillainStatsByPlayerCount = () => {
	return games.reduce((acc, game) => {
		if (!acc[game.numberOfPlayers]) {
			acc[game.numberOfPlayers] = {};
		}

		game.players.forEach((player) => {
			if (!acc[game.numberOfPlayers][player.villainId]) {
				acc[game.numberOfPlayers][player.villainId] = { wins: 0, total: 0 };
			}
			acc[game.numberOfPlayers][player.villainId].total += 1;
			if (player.isWinner) {
				acc[game.numberOfPlayers][player.villainId].wins += 1;
			}
		});
		return acc;
	}, {} as Record<number, Record<string, { wins: number; total: number }>>);
};

/**
 * Ottiene tutti i formati di gioco disponibili (numero di giocatori)
 */
export const getPlayerCounts = (): number[] => {
	return [...new Set(games.map((game) => game.numberOfPlayers))].sort();
};

/**
 * Calcola il numero totale di "slot giocatore" in tutte le partite
 */
export const getTotalPlays = (): number => {
	return games.reduce((sum, game) => sum + game.players.length, 0);
};

/**
 * Formatta una percentuale con un decimale
 */
export const formatPercentage = (value: number): string => {
	return value.toFixed(1);
};

/**
 * Ordina i villain per vittorie e percentuale di vittorie
 */
export const sortVillainsByWins = (
	villains: Array<{
		id: string;
		name: string;
		wins: number;
		total: number;
		winRate: string;
	}>
) => {
	return villains.sort(
		(a, b) => b.wins - a.wins || Number(b.winRate) - Number(a.winRate)
	);
};

export type VillainStats = {
	id: string;
	name: string;
	wins: number;
	total: number;
	winRate: string;
};

/**
 * Calcola le statistiche generali dei villain
 */
export const getMostWinningVillains = (limit?: number): VillainStats[] => {
	const stats = games.reduce((acc, game) => {
		game.players.forEach((player) => {
			if (!acc[player.villainId]) {
				acc[player.villainId] = { wins: 0, total: 0 };
			}
			acc[player.villainId].total += 1;
			if (player.isWinner) {
				acc[player.villainId].wins += 1;
			}
		});
		return acc;
	}, {} as Record<string, { wins: number; total: number }>);

	const villainStats = Object.entries(stats).map(([id, { wins, total }]) => ({
		id,
		name: getVillainName(id),
		wins,
		total,
		winRate: total > 0 ? formatPercentage((wins / total) * 100) : '0.0',
	}));

	const sorted = sortVillainsByWins(villainStats);
	return limit ? sorted.slice(0, limit) : sorted;
};

export type VillainUsageStats = {
	id: string;
	name: string;
	count: number;
	percentage: string;
};

/**
 * Calcola le statistiche di utilizzo dei villain
 */
export const getMostUsedVillains = (limit?: number): VillainUsageStats[] => {
	const totalPlays = getTotalPlays();

	const villainUsage = games.reduce((acc, game) => {
		game.players.forEach((player) => {
			acc[player.villainId] = (acc[player.villainId] || 0) + 1;
		});
		return acc;
	}, {} as Record<string, number>);

	const stats = Object.entries(villainUsage)
		.map(([id, count]) => ({
			id,
			name: getVillainName(id),
			count,
			percentage: formatPercentage((count / totalPlays) * 100),
		}))
		.sort((a, b) => b.count - a.count);

	return limit ? stats.slice(0, limit) : stats;
};

/**
 * Ottiene le partite più recenti
 * @param limit Numero massimo di partite da restituire
 */
export const getRecentGames = (limit?: number) => {
	const sortedGames = [...games].sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);

	return limit ? sortedGames.slice(0, limit) : sortedGames;
};

/**
 * Formatta una data nel formato italiano
 */
export const formatDate = (date: Date): string => {
	return date.toLocaleDateString('it-IT', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
};

/**
 * Ottiene le statistiche complete di un villain
 */
export const getVillainStats = (villainId: string) => {
	const stats = games.reduce(
		(acc, game) => {
			const villainGame = game.players.find((p) => p.villainId === villainId);
			if (villainGame) {
				acc.totalGames++;
				if (villainGame.isWinner) acc.wins++;
				if (game.date > acc.lastPlayed) acc.lastPlayed = game.date;
			}
			return acc;
		},
		{ totalGames: 0, wins: 0, lastPlayed: new Date(0) }
	);

	return {
		...stats,
		winRate: formatPercentage((stats.wins / stats.totalGames) * 100),
	};
};

/**
 * Ottiene le statistiche di un villain per numero di giocatori
 */
export const getVillainGamesByPlayerCount = (villainId: string) => {
	const statsByPlayerCount = games.reduce((acc, game) => {
		const villainGame = game.players.find((p) => p.villainId === villainId);
		if (villainGame) {
			if (!acc[game.numberOfPlayers]) {
				acc[game.numberOfPlayers] = { total: 0, wins: 0 };
			}
			acc[game.numberOfPlayers].total++;
			if (villainGame.isWinner) {
				acc[game.numberOfPlayers].wins++;
			}
		}
		return acc;
	}, {} as Record<number, { total: number; wins: number }>);

	return Object.entries(statsByPlayerCount)
		.map(([playerCount, stats]) => ({
			playerCount: Number(playerCount),
			...stats,
			winRate: formatPercentage((stats.wins / stats.total) * 100),
		}))
		.sort((a, b) => a.playerCount - b.playerCount);
};
