'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export function NewGameDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="default"
					size="icon">
					<Plus className="h-4 w-4" />
					<span className="sr-only">Aggiungi partita</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nuova partita</DialogTitle>
				</DialogHeader>
				{/* Il form verrà aggiunto qui successivamente */}
			</DialogContent>
		</Dialog>
	);
}
