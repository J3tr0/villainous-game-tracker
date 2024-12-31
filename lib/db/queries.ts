import { prisma } from '@/lib/db';

export async function getAllGames() {
	return await prisma.game.findMany({
		include: {
			players: true,
		},
		orderBy: {
			date: 'desc',
		},
	});
}

export async function getVillainGames(villainId: string) {
	return await prisma.game.findMany({
		where: {
			players: {
				some: {
					villainId: villainId,
				},
			},
		},
		include: {
			players: true,
		},
		orderBy: {
			date: 'desc',
		},
	});
}

export async function getVillainStats(villainId: string) {
	const games = await getVillainGames(villainId);

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
		winRate: ((stats.wins / stats.totalGames) * 100).toFixed(1),
	};
}

export async function getVillainGamesByPlayerCount(villainId: string) {
	const games = await getVillainGames(villainId);

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
			winRate: ((stats.wins / stats.total) * 100).toFixed(1),
		}))
		.sort((a, b) => a.playerCount - b.playerCount);
}

export async function getPlayerCounts() {
	const games = await getAllGames();
	return [...new Set(games.map((game) => game.numberOfPlayers))].sort();
}

export async function getTotalPlays() {
	const result = await prisma.player.count();
	return result;
}
