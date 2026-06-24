import { Router } from "express";

import {
  bookSession,
  getMySessions,
  acceptSession,
  rejectSession,
  cancelSession,
  completeSession,
} from "../controllers/session.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Student books a session
router.route("/book").post(
  verifyJWT,
  authorizeRoles("student"),
  bookSession
);

// Student or Mentor can view their sessions
router.route("/my-sessions").get(
  verifyJWT,
  authorizeRoles("student", "mentor"),
  getMySessions
);

// Mentor accepts session
router.route("/:sessionId/accept").patch(
  verifyJWT,
  authorizeRoles("mentor"),
  acceptSession
);

// Mentor rejects session
router.route("/:sessionId/reject").patch(
  verifyJWT,
  authorizeRoles("mentor"),
  rejectSession
);

// Student or Mentor cancels session
router.route("/:sessionId/cancel").patch(
  verifyJWT,
  authorizeRoles("student", "mentor"),
  cancelSession
);

// Mentor marks session as completed
router.route("/:sessionId/complete").patch(
  verifyJWT,
  authorizeRoles("mentor"),
  completeSession
);

export default router;