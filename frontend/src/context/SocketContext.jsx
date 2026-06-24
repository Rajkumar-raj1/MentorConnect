import { createContext, useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import {
  connectSocket,
  disconnectSocket,
} from "../socket/socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const socketInstance = connectSocket();

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket Connected:", socketInstance.id);

      // Tell backend who connected
      socketInstance.emit("join", user._id);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
    });

    socketInstance.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};