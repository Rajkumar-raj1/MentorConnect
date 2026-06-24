import { Router } from "express";

import {
  getAllUsers,
  getPendingMentors,
  approveMentor,
  rejectMentor,
  deleteUser,
} from "../controllers/admin.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// All admin routes require authentication + admin role
router.use(
  verifyJWT,
  authorizeRoles("admin")
);

// Get all users
router.route("/users").get(
  getAllUsers
);

// Get pending mentor approvals
router.route("/mentors/pending").get(
  getPendingMentors
);

// Approve mentor
router.route("/mentors/:userId/approve").patch(
  approveMentor
);

// Reject mentor
router.route("/mentors/:userId/reject").patch(
  rejectMentor
);

// Delete user
router.route("/users/:userId").delete(
  deleteUser
);

export default router;