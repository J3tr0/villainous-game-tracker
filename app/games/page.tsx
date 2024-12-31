import { prisma } from '@/lib/db';

import { GamesPageClient } from '@/components/GamesPageClient';

// Questo è il server component
export default async function GamesPage() {
	const games = await prisma.game.findMany({
		include: {
			players: true,
		},
		orderBy: {
			date: 'desc',
		},
	});

	return <GamesPageClient games={games} />;
}
