import { getGamesFromSheet } from '@/lib/googleSheets';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const games = await getGamesFromSheet();
		// console.log(games);
		return NextResponse.json(games);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: 'Errore nel recupero dei dati' },
			{ status: 500 }
		);
	}
}
