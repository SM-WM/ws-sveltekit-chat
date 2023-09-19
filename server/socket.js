import { Server } from "socket.io";
import { z } from "zod";

const messageSchema = z.object({
  id: z.string().min(1),
  userid: z.string().min(1),
  content: z.string(),
});

function createMessage(userid, content) {
  console.log("createMessage " + content + " " + userid)
  const id = crypto.randomUUID();
  const message = {
    id,
    userid,
    content,
  };
  const validatedMessage = messageSchema.safeParse(message);
  if (!validatedMessage.success) {
    throw new Error("Invalid message");
  }
  return validatedMessage.data;
}

async function createSocket(httpServer) {
  let messages = [];

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.emit("messages", messages);

    socket.on("message", (content, userid) => {
      try {
        const message = createMessage(content, userid);
        messages.push(message);
        console.log(messages)
        io.sockets.emit("messages", messages);
        return {
          message: "Message sent",
        };
      } catch (error) {
        return {
          error: error.message || "Error occured when sending a message",
        };
      }
    });
  });
}

export { createSocket };
