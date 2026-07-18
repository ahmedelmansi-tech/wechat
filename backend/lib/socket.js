import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

import { socketAuthMiddleWare } from "../middlewares/socket.auth";

const app = express();
const server = createServer(app);

// Socket Server
const io = new Server(server, {
  cors: {
    origin: [process.env.VITE_WECHAT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleWare);
