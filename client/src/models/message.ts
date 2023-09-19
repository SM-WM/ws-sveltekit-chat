import { z } from 'zod';

const messageSchema = z.object({
	id: z.string().min(1),
	userid: z.string().min(1),
	content: z.string()
});

type Message = z.infer<typeof messageSchema>;

export { Message, messageSchema };
