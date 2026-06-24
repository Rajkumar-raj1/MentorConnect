import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import mentorRouter from "./routes/mentor.routes.js";
import chatRouter from "./routes/chat.routes.js";
import groupRouter from "./routes/group.routes.js";
import sessionRouter from "./routes/session.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import adminRouter from "./routes/admin.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MentorConnect backend is running",
  });
});

// Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/mentors", mentorRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/groups", groupRouter);
app.use("/api/v1/sessions", sessionRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/admin", adminRouter);

// Error middleware
app.use(errorHandler);

export { app };