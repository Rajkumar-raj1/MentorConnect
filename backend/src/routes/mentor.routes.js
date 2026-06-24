import { Router } from "express";

import {
  createMentorProfile,
  getAllMentors,
  getMentorById,
  getMyMentorProfile,
  updateMentorProfile,
  searchMentors,
  deleteMentorProfile,
} from "../controllers/mentor.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllMentors);

router.route("/search").get(searchMentors);

router.route("/:mentorId").get(getMentorById);

// Mentor-only routes
router.route("/profile/create").post(
  verifyJWT,
  authorizeRoles("mentor"),
  createMentorProfile
);

router.route("/profile/me").get(
  verifyJWT,
  authorizeRoles("mentor"),
  getMyMentorProfile
);

router.route("/profile/update").patch(
  verifyJWT,
  authorizeRoles("mentor"),
  updateMentorProfile
);

router.route("/profile/delete").delete(
  verifyJWT,
  authorizeRoles("mentor"),
  deleteMentorProfile
);

export default router;