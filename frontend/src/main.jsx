import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

import  AuthProvider  from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import  NotificationProvider  from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <App />

            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={10}
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#1f2937",
                  color: "#fff",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#ffffff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);