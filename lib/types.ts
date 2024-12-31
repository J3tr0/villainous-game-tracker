import { Game as PrismaGame, Player as PrismaPlayer } from '@prisma/client';

export type GameWithPlayers = PrismaGame & {
	players: PrismaPlayer[];
};

export type VillainStats = {
	totalGames: number;
	wins: number;
	lastPlayed: Date;
	winRate: string;
};

export type GamesByPlayerCount = {
	playerCount: number;
	total: number;
	wins: number;
	winRate: string;
}[];

export interface GameResult {
	id: string;
	date: Date;
	numberOfPlayers: number;
	players: {
		id: number;
		gameId: number;
		villainId: string;
		isWinner: boolean;
	}[];
}
