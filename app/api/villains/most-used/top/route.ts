import { getMostUsedVillains } from '@/lib/stats';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const stats = await getMostUsedVillains(true);
		return NextResponse.json(stats);
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: 'Errore nel recupero dei dati' },
			{ status: 500 }
		);
	}
}