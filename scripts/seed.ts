import { prisma } from '@/lib/db';
import { GameResult } from '@/lib/types';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

interface CsvRecord {
	'Num. giocatori': string;
	Vincitore: string;
	'Data partita': string | '';
	Nome: string;
	'Creato da'?: string;
	[key: `${number}° giocatore`]: string;
}

// Mappa per convertire i nomi dei villain ai loro ID
const villainNameToId: { [key: string]: string } = {
	Malefica: 'malefica',
	Ursula: 'ursula',
	'Capitan Uncino': 'uncino',
	Jafar: 'jafar',
	'Principe Giovanni': 'giovanni',
	'Regina di Cuori': 'cuori',
	Rattigan: 'rattigan',
	Scar: 'scar',
	Yzma: 'yzma',
	'La matrigna': 'matrigna',
	Matrigna: 'matrigna',
	Gaston: 'gaston',
	'Re Cornelius': 'cornelius',
	Syndrome: 'syndrome',
	Sindrome: 'syndrome',
	Lotso: 'lotso',
	'Maga Magò': 'mago',
	Ade: 'ade',
	'Dr. Facilier': 'facilier',
	'Regina Cattiva': 'cattiva',
	Gambadilegno: 'gambadilegno',
	'Crudelia de Mon': 'crudelia',
	'Madre Gothel': 'gothel',
	'Re Candito': 'candito',
	'Shere Khan': 'sherkhan',
	'Bau Bau': 'baubau',
};

function parseDate(dateStr: string | ''): string {
	if (dateStr === '') return new Date().toISOString();
	const parts = dateStr.split('/');
	if (parts.length !== 3) return new Date().toISOString();

	const [day, month, year] = parts;
	const fullYear = year?.length === 2 ? 2000 + parseInt(year) : parseInt(year);
	return new Date(fullYear, parseInt(month) - 1, parseInt(day)).toISOString();
}

async function convertCsvToTs() {
	// Leggi il file CSV
	const csvPath = path.join(__dirname, '../data/data.csv');
	const csvData = fs.readFileSync(csvPath, 'utf-8');

	// Parsa il CSV
	const records = parse(csvData, {
		columns: true,
		skip_empty_lines: true,
	});

	// Converti i record in oggetti Game
	const games = records.map((record: CsvRecord) => {
		const players = [];
		const numberOfPlayers = parseInt(record['Num. giocatori']);
		const winner = record['Vincitore'];
		const createdBy = record['Nome'] || '';

		// Aggiungi i giocatori
		for (let i = 1; i <= numberOfPlayers; i++) {
			const villainName = record[`${i}° giocatore`];
			if (villainName) {
				players.push({
					villainId: villainNameToId[villainName],
					isWinner: villainName === winner,
				});
			}
		}

		return {
			numberOfPlayers,
			date: parseDate(record['Data partita']),
			players,
			name: record['Nome'],
			createdBy,
		};
	});

	// Seed del database
	for (const game of games) {
		await prisma.game.create({
			data: {
				date: new Date(game.date),
				numberOfPlayers: game.numberOfPlayers,
				createdBy: game.createdBy,
				players: {
					create: game.players.map((player: GameResult['players'][0]) => ({
						villainId: player.villainId,
						isWinner: player.isWinner,
					})),
				},
			},
		});
	}

	console.log(`Inseriti ${games.length} giochi nel database`);
}

convertCsvToTs()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
