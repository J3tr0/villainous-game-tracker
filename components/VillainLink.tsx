import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getVillainImage, getVillainName } from '@/lib/villainUtils';
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
	return (
		<Link
			href={`/stats/villains/${villainId}`}
			className={className}>
			<span className={`flex items-center gap-2 ${textClassName}`}>
				<Avatar className="size-8 rounded-sm">
					<AvatarImage src={getVillainImage(villainId)} />
				</Avatar>{' '}
				{getVillainName(villainId)}
			</span>
		</Link>
	);
}
