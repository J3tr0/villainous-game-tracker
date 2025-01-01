'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { GameWithPlayers } from '@/lib/types';
import { Calendar, FilterX, Search, Users } from 'lucide-react';
import { useState } from 'react';

interface GamesFilterProps {
	games: GameWithPlayers[];
	onFilter: (filtered: GameWithPlayers[]) => void;
}

export function GamesFilter({ games, onFilter }: GamesFilterProps) {
	const [playerCount, setPlayerCount] = useState<string>('all');
	const [dateFrom, setDateFrom] = useState<string>('');
	const [dateTo, setDateTo] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');

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

		if (searchTerm) {
			const search = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(g) =>
					// Cerca nel createdBy
					g.createdBy?.toLowerCase().includes(search) ||
					// Cerca nei villain
					g.players.some((p) => p.villainId.toLowerCase().includes(search))
			);
		}

		onFilter(filtered);
	};

	const handleReset = () => {
		setPlayerCount('all');
		setDateFrom('');
		setDateTo('');
		setSearchTerm('');
		onFilter(games);
	};

	return (
		<div className="space-y-4 mb-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				<div className="space-y-2">
					<Label
						htmlFor="search"
						className="flex items-center gap-2">
						<Search className="h-4 w-4" />
						Ricerca
					</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									id="search"
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Cerca villain o creatore..."
									className="w-full"
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Cerca per nome del villain o del creatore della partita</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="players"
						className="flex items-center gap-2">
						<Users className="h-4 w-4" />
						Numero giocatori
					</Label>
					<Select
						value={playerCount}
						onValueChange={setPlayerCount}>
						<SelectTrigger
							id="players"
							className="w-full">
							<SelectValue placeholder="Seleziona" />
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
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="dateFrom"
						className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						Data inizio
					</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									id="dateFrom"
									type="date"
									value={dateFrom}
									onChange={(e) => setDateFrom(e.target.value)}
									className="w-full"
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Filtra le partite a partire da questa data</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="dateTo"
						className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						Data fine
					</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Input
									id="dateTo"
									type="date"
									value={dateTo}
									onChange={(e) => setDateTo(e.target.value)}
									className="w-full"
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Filtra le partite fino a questa data</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			<div className="flex gap-2">
				<Button
					onClick={handleFilter}
					className="flex items-center gap-2">
					<Search className="h-4 w-4" />
					Filtra
				</Button>
				<Button
					variant="outline"
					onClick={handleReset}
					className="flex items-center gap-2">
					<FilterX className="h-4 w-4" />
					Reset
				</Button>
			</div>
		</div>
	);
}
