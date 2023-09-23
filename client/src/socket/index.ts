import { io } from 'socket.io-client';
import { messageSchema, type Message } from '../models/message';
import { messagesStore } from '../state/messages';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
	console.log('Connected to server');
});

socket.on('messages', (messages: Message[]) => {
	const validatedMessages: Message[] = [];
	messages.forEach((message) => {
		try {
			validatedMessages.push(messageSchema.parse(message));
		} catch (error) {
			console.error(error);
		}
	});
	messagesStore.set(validatedMessages);
	// console.log('Received messages', messages);
});

interface SendSuccess {
	message: string;
}

interface SendError {
	error: string;
}

export function sendMessage(content: string, id: string) {
	return new Promise(
		(
			resolve: (value: SendSuccess) => void,
			reject: (value: SendError) => void
		) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			socket.emit('message', content, id, (response: any) => {
				const error = response.error;
				if (error) {
					if (typeof error !== 'string') {
						reject({ error: 'Error sending message' });
						return;
					}
					reject({ error });

					return;
				}
				const message = response.message;
				if (!message || typeof message !== 'string') {
					reject({ error: 'Unexpected result from server' });
					return;
				}
				resolve({ message });
			});
		}
	);
}
