export type Villain = {
	id: string;
	idGoogle?: string;
	name: string;
	img: string;
};

export interface GameResult {
	id?: string;
	date: Date | string;
	numberOfPlayers: number;
	createdBy?: string;
	players: {
		villainId: string;
		isWinner: boolean;
	}[];
	name?: string;
}

export type GameWithPlayers = {
	id: string;
	numberOfPlayers: number;
	date: string;
	players: {
		villainId: string;
		isWinner: boolean;
	}[];
	createdBy?: string | null;
};

export type VillainStats = {
	id: string;
	name: string;
	total: number;
	wins: number;
	winRate: string;
	lastPlayed?: Date;
};

export type GamesByPlayerCount = {
	playerCount: number;
	total: number;
	wins: number;
	winRate: string;
}[];

export type VillainUsageStats = {
	id: string;
	name: string;
	count: number;
	percentage: string;
};

export type VillainStatsByPlayerCount = {
	count: number;
	stats: {
		id: string;
		name: string;
		total: number;
		wins: number;
		winRate: string;
	}[];
}[];
