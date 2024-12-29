import { GameResult } from '@/lib/type';

export const games: GameResult[] = [
	{
		id: '1',
		date: new Date('2024-03-15'),
		numberOfPlayers: 4,
		players: [
			{ villainId: 'malefica', isWinner: true },
			{ villainId: 'ursula', isWinner: false },
			{ villainId: 'jafar', isWinner: false },
			{ villainId: 'cuori', isWinner: false },
		],
	},
	{
		id: '2',
		date: new Date('2024-03-14'),
		numberOfPlayers: 3,
		players: [
			{ villainId: 'ade', isWinner: false },
			{ villainId: 'scar', isWinner: true },
			{ villainId: 'facilier', isWinner: false },
		],
	},
	{
		id: '3',
		date: new Date('2024-03-10'),
		numberOfPlayers: 2,
		players: [
			{ villainId: 'malefica', isWinner: false },
			{ villainId: 'ursula', isWinner: true },
		],
	},
	{
		id: '4',
		date: new Date('2024-03-08'),
		numberOfPlayers: 5,
		players: [
			{ villainId: 'crudelia', isWinner: false },
			{ villainId: 'gothel', isWinner: false },
			{ villainId: 'gaston', isWinner: true },
			{ villainId: 'yzma', isWinner: false },
			{ villainId: 'lotso', isWinner: false },
		],
	},
	{
		id: '5',
		date: new Date('2024-03-05'),
		numberOfPlayers: 3,
		players: [
			{ villainId: 'malefica', isWinner: true },
			{ villainId: 'cattiva', isWinner: false },
			{ villainId: 'syndrome', isWinner: false },
		],
	},
	{
		id: '6',
		date: new Date('2024-03-01'),
		numberOfPlayers: 4,
		players: [
			{ villainId: 'baubau', isWinner: false },
			{ villainId: 'sherkhan', isWinner: true },
			{ villainId: 'candito', isWinner: false },
			{ villainId: 'gambadilegno', isWinner: false },
		],
	},
	{
		id: '7',
		date: new Date('2024-02-28'),
		numberOfPlayers: 6,
		players: [
			{ villainId: 'malefica', isWinner: false },
			{ villainId: 'ursula', isWinner: false },
			{ villainId: 'uncino', isWinner: true },
			{ villainId: 'jafar', isWinner: false },
			{ villainId: 'giovanni', isWinner: false },
			{ villainId: 'cuori', isWinner: false },
		],
	},
	{
		id: '8',
		date: new Date('2024-02-25'),
		numberOfPlayers: 6,
		players: [
			{ villainId: 'rattigan', isWinner: false },
			{ villainId: 'scar', isWinner: false },
			{ villainId: 'yzma', isWinner: false },
			{ villainId: 'matrigna', isWinner: true },
			{ villainId: 'gaston', isWinner: false },
			{ villainId: 'cornelius', isWinner: false },
		],
	},
	{
		id: '9',
		date: new Date('2024-02-20'),
		numberOfPlayers: 5,
		players: [
			{ villainId: 'syndrome', isWinner: false },
			{ villainId: 'lotso', isWinner: false },
			{ villainId: 'mago', isWinner: true },
			{ villainId: 'ade', isWinner: false },
			{ villainId: 'facilier', isWinner: false },
		],
	},
	{
		id: '10',
		date: new Date('2024-02-15'),
		numberOfPlayers: 6,
		players: [
			{ villainId: 'cattiva', isWinner: false },
			{ villainId: 'gambadilegno', isWinner: false },
			{ villainId: 'crudelia', isWinner: true },
			{ villainId: 'gothel', isWinner: false },
			{ villainId: 'candito', isWinner: false },
			{ villainId: 'sherkhan', isWinner: false },
		],
	},
	{
		id: '11',
		date: new Date('2024-02-10'),
		numberOfPlayers: 4,
		players: [
			{ villainId: 'baubau', isWinner: true },
			{ villainId: 'mago', isWinner: false },
			{ villainId: 'ade', isWinner: false },
			{ villainId: 'facilier', isWinner: false },
		],
	},
];
