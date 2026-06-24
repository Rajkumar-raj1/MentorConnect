import { Server } from "socket.io";
import socketHandlers from "./socketHandlers.js";

let io;

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    socketHandlers(io, socket);
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
};

export { initializeSocket, getIO };