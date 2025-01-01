import { villains } from '@/data/data';
import { prisma } from '@/lib/db';

export async function getVillainStatsByPlayerCount(top = false) {
	const playerCounts = await prisma.game.groupBy({
		by: ['numberOfPlayers'],
		orderBy: { numberOfPlayers: 'asc' },
	});

	const statsByPlayerCount = await Promise.all(
		playerCounts.map(async ({ numberOfPlayers }) => {
			const totals = await prisma.player.groupBy({
				by: ['villainId'],
				where: { game: { numberOfPlayers } },
				_count: { villainId: true },
			});

			const wins = await prisma.player.groupBy({
				by: ['villainId'],
				where: {
					game: { numberOfPlayers },
					isWinner: true,
				},
				_count: { villainId: true },
			});

			let stats = totals
				.map((total) => {
					const win = wins.find((w) => w.villainId === total.villainId);
					const winRate =
						((win?._count.villainId ?? 0) / total._count.villainId) * 100;
					return {
						id: total.villainId,
						name: villains.find((v) => v.id === total.villainId)?.name,
						total: total._count.villainId,
						wins: win?._count.villainId ?? 0,
						winRate: winRate.toFixed(1),
					};
				})
				.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

			if (top) {
				stats = stats.slice(0, 5);
			}

			return { count: numberOfPlayers, stats };
		})
	);

	return statsByPlayerCount;
}

export async function getMostWinningVillains(top = false) {
	try {
		const totalGames = await prisma.player.groupBy({
			by: ['villainId'],
			_count: true,
		});

		const winningGames = await prisma.player.groupBy({
			by: ['villainId'],
			where: { isWinner: true },
			_count: true,
		});

		let villainStats = totalGames
			.map((v) => {
				const wins =
					winningGames.find((w) => w.villainId === v.villainId)?._count ?? 0;
				return {
					id: v.villainId,
					name: villains.find((vil) => vil.id === v.villainId)?.name,
					total: v._count,
					wins,
					winRate: ((wins / v._count) * 100).toFixed(1),
				};
			})
			.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

		if (top) {
			villainStats = villainStats.slice(0, 5);
		}

		return villainStats;
	} catch (error) {
		console.error('Error getting most winning villains:', error);
		throw error;
	}
}

export async function getMostUsedVillains(top = false) {
	try {
		const totalGames = await prisma.player.groupBy({
			by: ['villainId'],
			_count: true,
		});

		const totalPlays = totalGames.reduce((sum, v) => sum + v._count, 0);

		let villainStats = totalGames
			.map((v) => ({
				id: v.villainId,
				name: villains.find((vil) => vil.id === v.villainId)?.name,
				count: v._count,
				percentage: ((v._count / totalPlays) * 100).toFixed(1),
			}))
			.sort((a, b) => b.count - a.count);

		if (top) {
			villainStats = villainStats.slice(0, 5);
		}

		return villainStats;
	} catch (error) {
		console.error('Error getting most used villains:', error);
		throw error;
	}
}
