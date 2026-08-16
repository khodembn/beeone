import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { updateUserSchema } from "./dto/update-user.dto.js";

const router = Router();

// Get current user profile
router.get(
  "/me",
  authMiddleware,
  userController.getProfile
);

// Update current user profile
router.patch(
  "/me",
  authMiddleware,
  validate(updateUserSchema),
  userController.updateProfile
);

// Delete current user account
router.delete(
  "/me",
  authMiddleware,
  userController.deleteAccount
);

export default router;