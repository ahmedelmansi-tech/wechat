import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

import { socketAuthMiddleWare } from "../middlewares/socket.auth.js";

const app = express();
const server = createServer(app);
console.log(`hello from SOCKET :${process.env.VITE_WECHAT_URL}`.bgYellow);
// Socket Server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.use(socketAuthMiddleWare);
io.use((socket, next) => {
  console.log("Socket Reached");
  next();
});

const onLineUsers = {};

io.on("connection", (socket) => {
  console.log(`User ${socket?.user.name} Connected`.bgMagenta);
  console.log(`User Id ${socket?.userId} Connected`.bgMagenta);

  const socketId = socket?.userId;
  onLineUsers[socketId] = socket.userId;

  io.emit("onlineUsers", Object.keys(onLineUsers));

  socket.on("disconnect", () => {
    console.log(`User ${socket?.user.name} disconnected`.bgMagenta);

    delete onLineUsers[socketId];
    io.emit("onlineUsers", Object.keys(onLineUsers));
  });
});

export { server, app, io };
