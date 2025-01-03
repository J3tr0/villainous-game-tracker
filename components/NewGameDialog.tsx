'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { villains } from '@/data/data';
import { gameSchema } from '@/lib/validations/game';
import { getVillainImage, getVillainName } from '@/lib/villainUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Switch } from './ui/switch';

// Schema di validazione
const formSchema = z.object({
	date: z.date(),
	numberOfPlayers: z.string(),
	createdBy: z.string().min(2).max(50).optional().or(z.literal('')),
	players: z.array(
		z.object({
			villainId: z.string().min(1, 'Seleziona un villain'),
			isWinner: z.boolean(),
		})
	),
});

type FormValues = z.infer<typeof formSchema>;

export function NewGameDialog() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date(),
			numberOfPlayers: '2',
			createdBy: '',
			players: [
				{ villainId: '', isWinner: false },
				{ villainId: '', isWinner: false },
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: 'players',
		control: form.control,
	});

	// Aggiorna il numero di giocatori quando cambia la selezione
	const onPlayerCountChange = (value: string) => {
		const currentCount = fields.length;
		const newCount = parseInt(value);

		if (newCount > currentCount) {
			// Aggiungi giocatori
			for (let i = currentCount; i < newCount; i++) {
				append({ villainId: '', isWinner: false });
			}
		} else if (newCount < currentCount) {
			// Rimuovi giocatori
			for (let i = currentCount - 1; i >= newCount; i--) {
				remove(i);
			}
		}
	};

	const onSubmit = async (data: FormValues) => {
		try {
			setIsSubmitting(true);

			const gameData = {
				...data,
				numberOfPlayers: parseInt(data.numberOfPlayers),
				createdBy: data.createdBy || undefined,
			};

			const validationResult = gameSchema.safeParse(gameData);

			if (!validationResult.success) {
				toast.error('Dati non validi');
				return;
			}

			const response = await fetch('/api/games', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(validationResult.data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || 'Errore nel salvataggio della partita'
				);
			}

			toast.success('Partita salvata con successo');
			form.reset({
				numberOfPlayers: '2',
				date: new Date(),
				players: [
					{ villainId: '', isWinner: false },
					{ villainId: '', isWinner: false },
				],
			});
			router.refresh();
			setOpen(false);
		} catch (error) {
			toast.error('Errore', {
				description:
					error instanceof Error
						? error.message
						: 'Errore nel salvataggio della partita',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
				if (!open) {
					form.reset({
						numberOfPlayers: '2',
						date: new Date(),
						players: [
							{ villainId: '', isWinner: false },
							{ villainId: '', isWinner: false },
						],
					});
				}
			}}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					size="icon"
					onClick={() => setOpen(true)}
					className="bg-gradient-to-tl from-pink-500 to-indigo-800">
					<Plus className="h-4 w-4" />
					<span className="sr-only">Aggiungi partita</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nuova Partita</DialogTitle>
					<DialogDescription>
						Inserisci i dettagli della partita
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Data partita</FormLabel>
									<FormControl>
										<Input
											type="date"
											{...field}
											value={
												field.value ? format(field.value, 'yyyy-MM-dd') : ''
											}
											onChange={(e) => field.onChange(new Date(e.target.value))}
											max={format(new Date(), 'yyyy-MM-dd')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="numberOfPlayers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Numero di giocatori</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											onPlayerCountChange(value);
										}}
										defaultValue={field.value.toString()}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Seleziona il numero di giocatori" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{[2, 3, 4, 5, 6].map((num) => (
												<SelectItem
													key={num}
													value={num.toString()}>
													{num} giocatori
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							{fields.map((field, index) => {
								// Ottieni tutti i villain selezionati tranne quello corrente
								const selectedVillains = fields
									.filter((_, i) => i !== index)
									.map((_, i) => form.watch(`players.${i}.villainId`))
									.filter(Boolean);

								// Ottieni il valore corrente del villain
								const currentVillainId = form.watch(
									`players.${index}.villainId`
								);

								return (
									<div
										key={field.id}
										className="space-y-4">
										<FormField
											control={form.control}
											name={`players.${index}.villainId`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Villain {index + 1}</FormLabel>
													<Select
														onValueChange={(value) => {
															field.onChange(value);
															// Reset del vincitore quando cambia il villain
															form.setValue(`players.${index}.isWinner`, false);
														}}
														value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Seleziona un villain">
																	{field.value && (
																		<div className="flex items-center gap-2">
																			<Avatar className="size-6 rounded-sm">
																				<AvatarImage
																					src={getVillainImage(field.value)}
																				/>
																			</Avatar>
																			<span>{getVillainName(field.value)}</span>
																		</div>
																	)}
																</SelectValue>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{villains
																.filter(
																	(villain) =>
																		!selectedVillains.includes(villain.id) ||
																		field.value === villain.id
																)
																.map((villain) => (
																	<SelectItem
																		key={villain.id}
																		value={villain.id}>
																		<div className="flex items-center gap-2">
																			<Avatar className="size-6 rounded-sm">
																				<AvatarImage src={villain.img} />
																			</Avatar>
																			<span>{villain.name}</span>
																		</div>
																	</SelectItem>
																))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`players.${index}.isWinner`}
											render={({ field }) => (
												<FormItem className="flex items-center justify-between space-y-0">
													<FormLabel>Vincitore</FormLabel>
													<FormControl>
														<Switch
															checked={field.value}
															onCheckedChange={(checked) => {
																// Se stiamo attivando lo switch
																if (checked) {
																	// Prima disattiviamo tutti gli altri switch
																	fields.forEach((_, i) => {
																		if (i !== index) {
																			form.setValue(
																				`players.${i}.isWinner`,
																				false
																			);
																		}
																	});
																}
																field.onChange(checked);
															}}
															disabled={!currentVillainId}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								);
							})}
						</div>

						<FormField
							control={form.control}
							name="createdBy"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Registrata da</FormLabel>
									<FormControl>
										<Input
											placeholder="Il tuo nome"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={isSubmitting}>
							{isSubmitting ? 'Salvataggio...' : 'Salva partita'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
