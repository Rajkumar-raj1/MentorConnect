import { Router } from "express";

import {
  createOrGetConversation,
  getMyConversations,
  sendMessage,
  getMessages,
  markMessagesAsSeen,
} from "../controllers/chat.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

// Create or get conversation
router.route("/conversation").post(
  verifyJWT,
  createOrGetConversation
);

// Get all conversations of logged-in user
router.route("/conversations").get(
  verifyJWT,
  getMyConversations
);

// Get messages of a conversation
router.route("/messages/:conversationId").get(
  verifyJWT,
  getMessages
);

// Send message
router.route("/messages/:conversationId").post(
  verifyJWT,
  sendMessage
);

// Mark messages as seen
router.route("/messages/:conversationId/seen").patch(
  verifyJWT,
  markMessagesAsSeen
);

export default router;