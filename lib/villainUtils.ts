import { villains } from '@/data/data';
import { GameWithPlayers, VillainStats } from '@/lib/types';

export function getVillainID(name: string): string {
	return villains.find((v) => v.name === name)?.id ?? name;
}

export function getVillainName(id: string): string {
	return villains.find((v) => v.id === id)?.name ?? id;
}

export function getVillainImage(id: string): string {
	return villains.find((v) => v.id === id)?.img ?? '';
}

export async function getVillainStats(
	villainId: string
): Promise<VillainStats> {
	const res = await fetch('/api/games/sheet');
	const games = (await res.json()) as GameWithPlayers[];

	const villainGames = games.filter((game: GameWithPlayers) =>
		game.players.some((player) => player.villainId === villainId)
	);

	const total = villainGames.length;
	const wins = villainGames.filter(
		(game) => game.players.find((p) => p.villainId === villainId)?.isWinner
	).length;

	const lastPlayed =
		villainGames.length > 0
			? new Date(
					Math.max(...villainGames.map((g) => new Date(g.date).getTime()))
			  )
			: new Date();

	return {
		id: villainId,
		name: getVillainName(villainId),
		total,
		wins,
		lastPlayed,
		winRate: ((wins / total) * 100).toFixed(1) + '%',
	};
}

export async function getMostUsedVillains(): Promise<VillainStats[]> {
	const res = await fetch('/api/games/sheet');
	const games = (await res.json()) as GameWithPlayers[];

	const villainCounts = games
		.flatMap((game: GameWithPlayers) => game.players)
		.reduce((acc, player) => {
			acc[player.villainId] = (acc[player.villainId] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

	return Object.entries(villainCounts)
		.map(([id, count]) => ({
			id,
			name: getVillainName(id),
			total: count,
			wins: 0,
			winRate: ((count / games.length) * 100).toFixed(1) + '%',
			lastPlayed: new Date(),
		}))
		.sort((a, b) => b.total - a.total);
}

export async function getMostWinningVillains(): Promise<VillainStats[]> {
	const res = await fetch('/api/games/sheet');
	const games = (await res.json()) as GameWithPlayers[];

	const villainStats = games
		.flatMap((game: GameWithPlayers) => game.players)
		.reduce((acc, player) => {
			if (!acc[player.villainId]) {
				acc[player.villainId] = { total: 0, wins: 0 };
			}
			acc[player.villainId].total++;
			if (player.isWinner) acc[player.villainId].wins++;
			return acc;
		}, {} as Record<string, { total: number; wins: number }>);

	return Object.entries(villainStats)
		.map(([id, stats]) => ({
			id,
			name: getVillainName(id),
			total: stats.total,
			wins: stats.wins,
			winRate: ((stats.wins / stats.total) * 100).toFixed(1) + '%',
			lastPlayed: new Date(),
		}))
		.sort((a, b) => b.wins - a.wins);
}

export async function getPlayerCounts(): Promise<number[]> {
	const res = await fetch('/api/games/sheet');
	const games = (await res.json()) as GameWithPlayers[];

	return Array.from(
		new Set(games.map((g: GameWithPlayers) => g.numberOfPlayers))
	).sort((a, b) => a - b);
}

export async function getVillainStatsByPlayerCount(
	villainId: string
): Promise<[number, number, number][]> {
	const res = await fetch('/api/games/sheet');
	const games = (await res.json()) as GameWithPlayers[];

	const villainGames = games.filter((game: GameWithPlayers) =>
		game.players.some((player) => player.villainId === villainId)
	);

	const playerCounts = Array.from(
		new Set(villainGames.map((g) => g.numberOfPlayers))
	).sort((a, b) => a - b);

	return playerCounts.map((count) => {
		const gamesWithCount = villainGames.filter(
			(g) => g.numberOfPlayers === count
		);
		const wins = gamesWithCount.filter(
			(g) => g.players.find((p) => p.villainId === villainId)?.isWinner
		).length;

		return [count, gamesWithCount.length, wins];
	});
}
