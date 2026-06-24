import { Router } from "express";

import {
  createGroup,
  getAllGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  sendGroupMessage,
  getGroupMessages,
} from "../controllers/group.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Get all groups
router.route("/").get(verifyJWT, getAllGroups);

// Create group
router.route("/create").post(
  verifyJWT,
  upload.single("groupImage"),
  createGroup
);

// Join group
router.route("/:groupId/join").post(
  verifyJWT,
  joinGroup
);

// Leave group
router.route("/:groupId/leave").post(
  verifyJWT,
  leaveGroup
);

// Get group messages
router.route("/:groupId/messages").get(
  verifyJWT,
  getGroupMessages
);

// Send group message
router.route("/:groupId/messages").post(
  verifyJWT,
  sendGroupMessage
);

// Get single group
router.route("/:groupId").get(
  verifyJWT,
  getGroupById
);

export default router;