'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { villains } from '@/data/data';
import { getVillainImage, getVillainName } from '@/lib/villainUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Switch } from './ui/switch';

// Schema di validazione
const formSchema = z.object({
	numberOfPlayers: z.string(),
	date: z.date(),
	players: z.array(
		z.object({
			villainId: z.string(),
			isWinner: z.boolean(),
		})
	),
});

type FormValues = z.infer<typeof formSchema>;

export function NewGameDialog() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			numberOfPlayers: '2',
			date: new Date(),
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

	const onSubmit = (data: FormValues) => {
		console.log(data);
		// Qui implementeremo il salvataggio della partita
	};

	const onOpenChange = (open: boolean) => {
		if (!open) {
			// Reset del form quando il dialog viene chiuso
			form.reset({
				numberOfPlayers: '2',
				date: new Date(),
				players: [
					{ villainId: '', isWinner: false },
					{ villainId: '', isWinner: false },
				],
			});
		}
	};

	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					size="icon"
					className="bg-gradient-to-tl from-pink-500 to-indigo-800">
					<Plus className="h-4 w-4" />
					<span className="sr-only">Aggiungi partita</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Nuova partita</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4">
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
										defaultValue={field.value}>
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

								// Controlla se c'è già un vincitore in un altro campo
								const hasWinner = fields
									.filter((_, i) => i !== index)
									.map((_, i) => form.watch(`players.${i}.isWinner`))
									.some(Boolean);

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

						<Button type="submit">Salva partita</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
