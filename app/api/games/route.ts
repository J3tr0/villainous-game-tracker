import { prisma } from '@/lib/db';
import { gameSchema } from '@/lib/validations/game';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validazione dei dati in ingresso
		const validationResult = gameSchema.safeParse(body);

		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'Dati non validi',
					details: validationResult.error.format(),
				},
				{ status: 400 }
			);
		}

		const game = await prisma.game.create({
			data: {
				numberOfPlayers: validationResult.data.numberOfPlayers,
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
		console.error('Error:', error);
		return NextResponse.json(
			{ error: 'Errore nel salvataggio della partita' },
			{ status: 500 }
		);
	}
}
