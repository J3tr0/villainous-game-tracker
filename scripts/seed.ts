import { games } from '@/data/games';
import { prisma } from '@/lib/db';

async function seed() {
	// Elimina tutti i dati esistenti
	await prisma.player.deleteMany();
	await prisma.game.deleteMany();

	// Crea le nuove partite
	for (const game of games) {
		await prisma.game.create({
			data: {
				date: game.date,
				numberOfPlayers: game.numberOfPlayers,
				createdBy: game.createdBy,
				players: {
					create: game.players,
				},
			},
		});
	}
}

seed()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
