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

let users: IMessageID[] = [];

io.on("connection", (socket) => {
  console.log("connected");
  const id = socket.id;

  socket.on("createChat", (user: IMessageID) => {
    const data: IMessageID = {
      ...user,
      socketId: id,
    };

    const findData = users.find((u) => u.consultantId !== user.consultantId);

    if (findData) return socket.emit("createChatReturn", findData);
    users.push(data);
    console.log(data);
    socket.emit("createChatReturn", data);
  });

  socket.on("joinChat", async (id: string) => {
    const findData = users.find((u) => u.socketId !== id);

    if (!findData) return console.error("No data found");
    if (!findData.socketId) return console.error("No socket id found");
    console.log("Join: " + findData.socketId);
    await socket.join(findData.socketId);
  });

  socket.on("sendMessage", (msg: IMessage) => {
    const findUser = users.find(
      (user) => user.consultantId === msg.consultantId
    );

    users = users.filter((user) => user.consultantId !== msg.consultantId);

    const newData = {
      ...findUser,
      ...msg,
    };

    users.push(newData);

    if (!findUser) return console.error("User tidak ditemukan");

    if (!findUser.socketId) return console.error("Socket id not found");

    if (!msg.message) return console.error("msg not found");

    console.log(findUser.socketId);
    io.to(findUser.socketId).emit("reply", msg);
  });

  socket.on("getMessage", (id: string) => {
    const findUser = users.filter((user) => user.consultantId === id);

    socket.emit("postMessage", findUser);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server run on http://localhost:" + PORT);
});
