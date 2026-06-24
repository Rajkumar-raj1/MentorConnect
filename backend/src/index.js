import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import http from "http";

import connectDB from "./config/db.js";
import { app } from "./app.js";
import { initializeSocket } from "./socket/socket.js";



const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();