import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { villains } from '@/data/data';
import { getVillainID, getVillainImage } from '@/lib/villainUtils';
import Link from 'next/link';

interface VillainLinkProps {
	villainId: string;
	className?: string;
	textClassName?: string;
}

export function VillainLink({
	villainId,
	className = 'block hover:bg-gradient-to-tl hover:from-pink-500/25 hover:to-indigo-800/25',
	textClassName = 'text-sm',
}: VillainLinkProps) {
	// Cerca prima per idGoogle, poi per id
	const villain = villains.find(
		(v) => v.idGoogle === villainId || v.id === villainId
	) || { id: villainId, name: villainId, img: '/placeholder-villain.png' };

	return (
		<Link
			href={`/stats/villains/${getVillainID(villain.name)}`}
			className={className}>
			<span className={`flex items-center gap-2 ${textClassName}`}>
				<Avatar className="size-8 rounded-sm">
					<AvatarImage
						src={getVillainImage(getVillainID(villain.name))}
						alt={villain.name}
					/>
				</Avatar>
				{villain.name}
			</span>
		</Link>
	);
}
