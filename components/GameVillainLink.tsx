import { Badge } from '@/components/ui/badge';
import { VillainLink } from './VillainLink';

interface GameVillainLinkProps {
	villainId: string;
	isWinner: boolean;
}

export function GameVillainLink({ villainId, isWinner }: GameVillainLinkProps) {
	return (
		<div className="block hover:bg-gradient-to-tl hover:from-pink-500/25 hover:to-indigo-800/25">
			<div className="flex justify-between items-center px-6 py-2">
				<VillainLink
					villainId={villainId}
					className="block"
					textClassName={`text-sm ${isWinner ? 'font-medium' : 'font-light'}`}
				/>
				{isWinner && (
					<Badge className="bg-green-500 text-white">Vincitore 👑</Badge>
				)}
			</div>
		</div>
	);
}
