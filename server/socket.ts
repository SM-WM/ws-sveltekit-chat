import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { z } from "zod";

const messageSchema = z.object({
  id: z.string().min(1).uuid(),
  userid: z.string().min(1).uuid(),
  content: z.string(),
});

type Message = z.infer<typeof messageSchema>;

function createMessage(content: string, userid: string) {
  const id = crypto.randomUUID();
  const message = { id, userid, content };
  console.log(message);
  const validatedMessage = messageSchema.safeParse(message);
  if (!validatedMessage.success) throw new Error("Invalid message");
  return validatedMessage.data;
}

async function createSocket(httpServer: HttpServer) {
  let messages: Message[] = [];

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.emit("messages", messages);

    socket.on("message", (content: string, userid: string) => {
      try {
        const message = createMessage(content, userid);
        messages.push(message);
        io.sockets.emit("messages", messages);
        return {
          message: "Message sent",
        };
      } catch (error: any) {
        return {
          error: error.message || "Error occured when sending a message",
        };
      }
    });
  });
}

export { createSocket };
