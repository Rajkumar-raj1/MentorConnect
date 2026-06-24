import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  changePassword,
} from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/profile").get(verifyJWT, getUserProfile);

router.route("/profile").patch(verifyJWT, updateUserProfile);

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);

router.route("/change-password").patch(verifyJWT, changePassword);

export default router;