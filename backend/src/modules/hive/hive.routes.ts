import { Router } from "express";
import { hiveController } from "./hive.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createHiveSchema } from "./dto/create-hive.dto.js";
import { updateHiveSchema } from "./dto/update-hive.dto.js";

const router = Router();

// Create Hive
router.post(
  "/apiaries/:apiaryId/hives",
  authMiddleware,
  validate(createHiveSchema),
  hiveController.createHive
);

// Get all Hives of an Apiary
router.get(
  "/apiaries/:apiaryId/hives",
  authMiddleware,
  hiveController.getMyHives
);

// Get one Hive
router.get(
  "/hives/:id",
  authMiddleware,
  hiveController.getHive
);

// Update Hive
router.patch(
  "/hives/:id",
  authMiddleware,
  validate(updateHiveSchema),
  hiveController.updateHive
);

// Delete Hive
router.delete(
  "/hives/:id",
  authMiddleware,
  hiveController.deleteHive
);

export default router;