import { PrismaClient } from '@prisma/client';
import { games } from '../data/games';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Inizializzazione del database...');

	// Elimina tutti i dati esistenti
	await prisma.player.deleteMany();
	await prisma.game.deleteMany();

	console.log('🧹 Database pulito');

	// Importa i giochi
	for (const game of games) {
		await prisma.game.create({
			data: {
				date: game.date,
				numberOfPlayers: game.numberOfPlayers,
				players: {
					create: game.players.map((player) => ({
						villainId: player.villainId,
						isWinner: player.isWinner,
					})),
				},
			},
		});
	}

	console.log('✅ Dati importati con successo');
}

main()
	.catch((e) => {
		console.error("❌ Errore durante l'importazione:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
