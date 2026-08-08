import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

import { socketAuthMiddleWare } from "../middlewares/socket.auth.js";

const app = express();
const server = createServer(app);
// console.log(`hello from SOCKET :${process.env.VITE_WECHAT_URL}`.bgYellow);
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

// Detect to who i will message if he is online

const onlineUsers = new Map();

export function getUserRecieverId(id) {
  let socketId = onlineUsers.get(id);
  return socketId;
}

io.on("connection", (socket) => {
  console.log(`User ${socket?.user.name} Connected`.bgMagenta);
  console.log(`User Id ${socket?.userId} Connected`.bgMagenta);

  console.log("USER ID  QUERY", socket.handshake.query);

  const socketId = socket?.id;
  onlineUsers.set(socket.userId, socketId);
  io.emit("onlineUsers", [...onlineUsers.keys()]);

  socket.on("disconnect", () => {
    console.log(`User ${socket?.user.name} disconnected`.bgMagenta);
    onlineUsers.delete(socket.userId);
    io.emit("onlineUsers", [...onlineUsers.keys()]);
  });
});

export { server, app, io };
