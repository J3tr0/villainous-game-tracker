import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const totalGames = await prisma.game.count();

		if (!totalGames) {
			return NextResponse.json([]);
		}

		const gamesByPlayerCount = await prisma.game.groupBy({
			by: ['numberOfPlayers'],
			_count: {
				id: true,
			},
			orderBy: {
				numberOfPlayers: 'asc',
			},
		});

		const stats = gamesByPlayerCount.map((stat) => ({
			players: stat.numberOfPlayers,
			count: stat._count.id,
			percentage: ((stat._count.id / totalGames) * 100).toFixed(1),
			totalGames,
		}));

		return NextResponse.json(stats);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: 'Errore nel recupero dei dati' },
			{ status: 500 }
		);
	}
}
