import { io } from "socket.io-client";

let socket = null;

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

export const connectSocket = () => {
  if (socket?.connected) {
    return socket;
  }

  const token = localStorage.getItem("accessToken");

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    withCredentials: true,

    auth: {
      token,
    },
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;