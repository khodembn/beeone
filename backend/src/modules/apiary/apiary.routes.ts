import { Router } from "express";
import { apiaryController } from "./apiary.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createApiarySchema } from "./dto/create-apiary.dto.js";
import { updateApiarySchema } from "./dto/update-apiary.dto.js";

const router = Router();

// Create Apiary
router.post(
  "/",
  authMiddleware,
  validate(createApiarySchema),
  apiaryController.createApiary
);

// Get all user's Apiaries
router.get(
  "/",
  authMiddleware,
  apiaryController.getMyApiaries
);

// Get one Apiary
router.get(
  "/:id",
  authMiddleware,
  apiaryController.getApiary
);

// Update Apiary
router.patch(
  "/:id",
  authMiddleware,
  validate(updateApiarySchema),
  apiaryController.updateApiary
);

// Delete Apiary
router.delete(
  "/:id",
  authMiddleware,
  apiaryController.deleteApiary
);

export default router;