import { z } from 'zod';

export const messageSchema = z.object({
	id: z.string().min(1),
	userid: z.string().min(1),
	content: z.string()
});

export type Message = z.infer<typeof messageSchema>;
