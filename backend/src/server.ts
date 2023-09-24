import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: "http://localhost:5173",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join_room", async (r: string) => {
    await socket.join(r);
  });

  socket.on("chat", (m: IMessage) => {
    if (!m) return;
    io.to(m.room!).emit("reply", m);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server run on http://localhost:" + PORT);
});
