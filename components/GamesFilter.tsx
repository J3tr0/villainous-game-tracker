'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { GameWithPlayers } from '@/lib/types';
import { useState } from 'react';

interface GamesFilterProps {
	games: GameWithPlayers[];
	onFilter: (filtered: GameWithPlayers[]) => void;
}

export function GamesFilter({ games, onFilter }: GamesFilterProps) {
	const [playerCount, setPlayerCount] = useState<string>('all');
	const [dateFrom, setDateFrom] = useState<string>('');
	const [dateTo, setDateTo] = useState<string>('');

	const playerCounts = Array.from(
		new Set(games.map((g) => g.numberOfPlayers))
	).sort();

	const handleFilter = () => {
		let filtered = [...games];

		if (playerCount !== 'all') {
			filtered = filtered.filter(
				(g) => g.numberOfPlayers === parseInt(playerCount)
			);
		}

		if (dateFrom) {
			filtered = filtered.filter((g) => g.date >= new Date(dateFrom));
		}

		if (dateTo) {
			filtered = filtered.filter((g) => g.date <= new Date(dateTo));
		}

		onFilter(filtered);
	};

	const handleReset = () => {
		setPlayerCount('all');
		setDateFrom('');
		setDateTo('');
		onFilter(games);
	};

	return (
		<div className="flex flex-wrap gap-4 mb-6">
			<Select
				value={playerCount}
				onValueChange={setPlayerCount}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Numero giocatori" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Tutti</SelectItem>
					{playerCounts.map((count) => (
						<SelectItem
							key={count}
							value={count.toString()}>
							{count} giocatori
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Input
				type="date"
				value={dateFrom}
				onChange={(e) => setDateFrom(e.target.value)}
				className="w-[180px]"
			/>

			<Input
				type="date"
				value={dateTo}
				onChange={(e) => setDateTo(e.target.value)}
				className="w-[180px]"
			/>

			<Button onClick={handleFilter}>Filtra</Button>
			<Button
				variant="outline"
				onClick={handleReset}>
				Reset
			</Button>
		</div>
	);
}
