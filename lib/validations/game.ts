import { z } from 'zod';

export const gameSchema = z.object({
  numberOfPlayers: z.number().min(2).max(6),
  players: z.array(
    z.object({
      villainId: z.string().min(1, 'Villain obbligatorio'),
      isWinner: z.boolean(),
    })
  )
  .min(2)
  .max(6)
  .refine(
    (players) => {
      // Verifica che ci sia esattamente un vincitore
      return players.filter(p => p.isWinner).length === 1;
    },
    {
      message: 'Deve esserci esattamente un vincitore',
    }
  )
  .refine(
    (players) => {
      // Verifica che non ci siano villain duplicati
      const villainIds = players.map(p => p.villainId);
      return new Set(villainIds).size === villainIds.length;
    },
    {
      message: 'Non possono esserci villain duplicati',
    }
  ),
});

export type GameCreateInput = z.infer<typeof gameSchema>; 