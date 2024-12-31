import { prisma } from '@/lib/db';
import { gameSchema } from '@/lib/validations/game';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const gameData = {
			...body,
			numberOfPlayers: parseInt(body.numberOfPlayers),
		};

		const validationResult = gameSchema.safeParse(gameData);

		if (!validationResult.success) {
			return NextResponse.json(
				{ error: 'Dati non validi', issues: validationResult.error.issues },
				{ status: 400 }
			);
		}

		const game = await prisma.game.create({
			data: {
				date: new Date(),
				numberOfPlayers: validationResult.data.numberOfPlayers,
				createdBy: validationResult.data.createdBy,
				players: {
					create: validationResult.data.players,
				},
			},
			include: {
				players: true,
			},
		});

		return NextResponse.json(game);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: 'Errore nel salvataggio della partita' },
			{ status: 500 }
		);
	}
}
