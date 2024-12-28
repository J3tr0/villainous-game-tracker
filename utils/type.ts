export interface Villain {
	id: string;
	name: string;
	img?: string;
}

export interface GameResult {
	id: string;
	date: Date;
	numberOfPlayers: number;
	players: {
		villainId: string;
		isWinner: boolean;
	}[];
}

export interface VillainStats {
	villainId: string;
	gamesPlayed: number;
	wins: number;
	losses: number;
	winRate: number;
}
