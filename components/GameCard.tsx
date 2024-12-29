import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameResult } from '@/lib/type';
import { getVillainImage, getVillainName } from '@/lib/villainUtils';
import Link from 'next/link';

export function GameCard({ game }: { game: GameResult }) {
	return (
		<Card className="rounded-sm">
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
			<CardContent className="pb-6 px-0">
				<div className="space-y-1">
					{game.players.map((player, index) => (
						<Link
							key={index}
							href={`/stats/villains/${player.villainId}`}
							className="block hover:bg-gradient-to-tl hover:from-pink-500/25 hover:to-indigo-800/25">
							<div className="flex justify-between items-center px-6 py-2">
								<span
									className={`flex items-center gap-2 text-sm ${
										player.isWinner ? 'font-medium' : 'font-light'
									}`}>
									<Avatar className="size-8 rounded-sm">
										<AvatarImage src={getVillainImage(player.villainId)} />
									</Avatar>
									{getVillainName(player.villainId)}
								</span>
								{player.isWinner && (
									<Badge className="bg-green-500 text-white">
										Vincitore 👑
									</Badge>
								)}
							</div>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
