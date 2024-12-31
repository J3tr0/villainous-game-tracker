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
	const winRate = ((wins / total) * 100).toFixed(1) + '%';
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
	const totalGames = await prisma.game.count();
	const villainCounts = await prisma.player.groupBy({
		by: ['villainId'],
		_count: { villainId: true },
		orderBy: { _count: { villainId: 'desc' } },
	});

	return villainCounts.map((v) => ({
		id: v.villainId,
		name: getVillainName(v.villainId),
		total: v._count.villainId,
		wins: 0,
		winRate: ((v._count.villainId / totalGames) * 100).toFixed(1) + '%',
		lastPlayed: new Date(),
	}));
}

export async function getMostWinningVillains(): Promise<VillainStats[]> {
	const [totalGames, winningGames] = await Promise.all([
		prisma.player.groupBy({ by: ['villainId'], _count: true }),
		prisma.player.groupBy({
			by: ['villainId'],
			where: { isWinner: true },
			_count: true,
		}),
	]);

	return totalGames
		.map((v) => {
			const wins =
				winningGames.find((w) => w.villainId === v.villainId)?._count ?? 0;
			return {
				id: v.villainId,
				name: getVillainName(v.villainId),
				total: v._count,
				wins,
				winRate: ((wins / v._count) * 100).toFixed(1) + '%',
				lastPlayed: new Date(),
			};
		})
		.sort((a, b) => b.wins - a.wins);
}

export async function getPlayerCounts(): Promise<number[]> {
	const counts = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		orderBy: { numberOfPlayers: 'asc' },
	});
	return counts.map((p) => p.numberOfPlayers);
}

export async function getVillainStatsByPlayerCount(
	villainId: string
): Promise<[number, number, number][]> {
	const [stats, wins] = await Promise.all([
		prisma.game.groupBy({
			by: ['numberOfPlayers'],
			where: { players: { some: { villainId } } },
			_count: { _all: true },
			orderBy: { numberOfPlayers: 'asc' },
		}),
		prisma.game.groupBy({
			by: ['numberOfPlayers'],
			where: { players: { some: { villainId, isWinner: true } } },
			_count: { _all: true },
		}),
	]);

	return stats.map((stat) => [
		stat.numberOfPlayers,
		stat._count._all,
		wins.find((w) => w.numberOfPlayers === stat.numberOfPlayers)?._count._all ??
			0,
	]);
}
