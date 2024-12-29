import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { villains } from '@/data/data';
import { GameResult } from '@/lib/type';

export function GameCard({ game }: { game: GameResult }) {
	const getVillainName = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.name || villainId;
	};
	const getVillainImage = (villainId: string) => {
		return villains.find((v) => v.id === villainId)?.img || villainId;
	};

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">
						{game.numberOfPlayers} giocatori
					</CardTitle>
					<Badge variant="secondary">
						{new Date(game.date).toLocaleDateString('it-IT', {
							day: 'numeric',
							month: 'short',
							year: 'numeric',
						})}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-1">
					{game.players.map((player, index) => (
						<div
							key={index}
							className="flex justify-between items-center">
							<span
								className={`flex items-center gap-2 ${
									player.isWinner ? 'font-medium' : ''
								}`}>
								<Avatar>
									<AvatarImage src={getVillainImage(player.villainId)} />
								</Avatar>

								{getVillainName(player.villainId)}
							</span>
							{player.isWinner && (
								<Badge className="bg-green-500 text-white">Vincitore 👑</Badge>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
