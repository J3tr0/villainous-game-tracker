import { google } from 'googleapis';
import { GameResult } from './types';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SHEET_ID = '1mKCxWAJWHdQzi0tTH_2grxrdZRl5A49HPxM-3O2bpRg';

async function getAuthClient() {
	if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
		throw new Error('Missing Google credentials');
	}

	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		},
		scopes: SCOPES,
	});
	return auth;
}

export async function getGamesFromSheet(): Promise<GameResult[]> {
	try {
		const auth = await getAuthClient();
		const sheets = google.sheets({ version: 'v4', auth });

		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: SHEET_ID,
			range: 'A2:J',
		});

		if (!response.data.values) {
			return [];
		}

		return [...response.data.values].reverse().map((row) => {
			// console.log('Data dalla sheet:', row[8]);

			let date = new Date();

			if (row[8]) {
				const [day, month, year] = row[8].split('/');
				const fullYear = year.length === 2 ? '20' + year : year;
				date = new Date(`${fullYear}-${month}-${day}`);

				if (isNaN(date.getTime())) {
					date = new Date();
				}
			}

			return {
				id: crypto.randomUUID(),
				date,
				numberOfPlayers: parseInt(row[0]),
				createdBy: row[9] || null,
				players: [
					{ villainId: row[2], isWinner: row[1] === row[2] },
					{ villainId: row[3], isWinner: row[1] === row[3] },
					{ villainId: row[4], isWinner: row[1] === row[4] },
					{ villainId: row[5], isWinner: row[1] === row[5] },
					{ villainId: row[6], isWinner: row[1] === row[6] },
					{ villainId: row[7], isWinner: row[1] === row[7] },
				].filter((p) => p.villainId),
			};
		});
	} catch (error) {
		console.error('Error fetching from sheet:', error);
		return [];
	}
}
