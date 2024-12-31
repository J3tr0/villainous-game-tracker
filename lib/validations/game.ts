import { z } from 'zod';

export const gameSchema = z.object({
	numberOfPlayers: z.number(),
	createdBy: z.string().min(2).max(50).optional(),
	players: z.array(
		z.object({
			villainId: z.string(),
			isWinner: z.boolean(),
		})
	),
});

export type GameCreateInput = z.infer<typeof gameSchema>;
