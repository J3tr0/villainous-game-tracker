import { villains } from '@/data/data';
import { prisma } from '@/lib/db';
import { VillainStats } from '@/lib/types';

export function getVillainName(id: string): string {
	return villains.find((v) => v.id === id)?.name ?? id;
}

export function getVillainImage(id: string): string {
	return villains.find((v) => v.id === id)?.img ?? '';
}

export async function getVillainStats(
	villainId: string
): Promise<VillainStats> {
	const games = await prisma.player.findMany({
		where: { villainId },
		include: { game: true },
	});

	const total = games.length;
	const wins = games.filter((game) => game.isWinner).length;
	const winRate = formatPercentage(wins, total);
	const lastPlayed =
		games.length > 0
			? games.sort((a, b) => b.game.date.getTime() - a.game.date.getTime())[0]
					.game.date
			: new Date();

	return {
		id: villainId,
		name: getVillainName(villainId),
		total,
		wins,
		lastPlayed,
		winRate,
	};
}

export async function getMostUsedVillains(): Promise<VillainStats[]> {
	const villainCounts = await prisma.player.groupBy({
		by: ['villainId'],
		_count: true,
		orderBy: { _count: { villainId: 'desc' } },
	});

	return villainCounts.map((v) => ({
		id: v.villainId,
		name: getVillainName(v.villainId),
		total: v._count,
		wins: 0, // non serve per questa vista
		winRate: '0.0',
		lastPlayed: new Date(),
	}));
}

export async function getMostWinningVillains(): Promise<VillainStats[]> {
	const totalGames = await prisma.player.groupBy({
		by: ['villainId'],
		_count: true,
	});

	const winningGames = await prisma.player.groupBy({
		by: ['villainId'],
		where: { isWinner: true },
		_count: true,
	});

	return totalGames
		.map((v) => {
			const wins =
				winningGames.find((w) => w.villainId === v.villainId)?._count ?? 0;
			return {
				id: v.villainId,
				name: getVillainName(v.villainId),
				total: v._count,
				wins,
				winRate: formatPercentage(wins, v._count),
				lastPlayed: new Date(), // non serve per questa vista
			};
		})
		.sort((a, b) => b.wins - a.wins);
}

export function formatPercentage(value: number, total: number): string {
	if (total === 0) return '0.0%';
	return ((value / total) * 100).toFixed(1) + '%';
}

export async function getPlayerCounts(): Promise<number[]> {
	const playerCounts = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		orderBy: {
			numberOfPlayers: 'asc',
		},
	});

	return playerCounts.map((p) => p.numberOfPlayers);
}

export async function getVillainStatsByPlayerCount(
	villainId: string
): Promise<[number, number, number][]> {
	const stats = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		where: {
			players: {
				some: {
					villainId,
				},
			},
		},
		_count: {
			_all: true,
		},
		orderBy: {
			numberOfPlayers: 'asc',
		},
	});

	const wins = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		where: {
			players: {
				some: {
					villainId,
					isWinner: true,
				},
			},
		},
		_count: {
			_all: true,
		},
	});

	return stats.map((stat) => {
		const winCount =
			wins.find((w) => w.numberOfPlayers === stat.numberOfPlayers)?._count
				._all ?? 0;
		return [stat.numberOfPlayers, stat._count._all, winCount];
	});
}
