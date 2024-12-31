import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameWithPlayers } from '@/lib/types';
import { GameVillainLink } from './GameVillainLink';

interface GameCardProps {
	game: GameWithPlayers;
}

export function GameCard({ game }: GameCardProps) {
	return (
		<Card className="rounded-sm relative">
			<CardHeader className="py-2 bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 rounded-t-sm">
				<div className="flex justify-between items-center">
					<CardTitle className="text-xs uppercase">
						{game.numberOfPlayers} giocatori
					</CardTitle>
					<Badge
						variant="secondary"
						className="rounded-sm bg-zinc-50 dark:bg-zinc-900 uppercase">
						{new Date(game.date).toLocaleDateString('it-IT', {
							day: 'numeric',
							month: 'short',
							year: 'numeric',
						})}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pb-2 px-0 mb-6">
				<div className="space-y-1">
					{game.players.map((player, index) => (
						<GameVillainLink
							key={index}
							villainId={player.villainId}
							isWinner={player.isWinner}
						/>
					))}
				</div>
			</CardContent>
			<div className="absolute bottom-0 px-6 py-2 w-full text-xs text-muted-foreground italic text-right">
				{game.createdBy && `Registrata da ${game.createdBy}`}
			</div>
		</Card>
	);
}
