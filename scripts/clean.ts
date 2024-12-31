import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('🧹 Pulizia del database in corso...');

	// Elimina tutti i dati esistenti
	await prisma.player.deleteMany();
	await prisma.game.deleteMany();

	console.log('✨ Database pulito con successo');
}

main()
	.catch((e) => {
		console.error('❌ Errore durante la pulizia:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
