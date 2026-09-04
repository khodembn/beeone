import { Router } from "express";

import { hiveFrameController } from "./hive-frame.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { createHiveFrameSchema } from "./dto/create-hive-frame.dto.js";

import { updateHiveFrameSchema } from "./dto/update-hive-frame.dto.js";

const router = Router();

// Create Hive Frame

router.post(
  "/hives/:hiveId/frames",
  authMiddleware,
  validate(createHiveFrameSchema),
  hiveFrameController.createHiveFrame
);

// Get all Frames of a Hive

router.get(
  "/hives/:hiveId/frames",
  authMiddleware,
  hiveFrameController.getMyHiveFrames
);

// Get one Hive Frame

router.get(
  "/hive-frames/:id",
  authMiddleware,
  hiveFrameController.getHiveFrame
);

// Update Hive Frame

router.patch(
  "/hive-frames/:id",
  authMiddleware,
  validate(updateHiveFrameSchema),
  hiveFrameController.updateHiveFrame
);

// Delete Hive Frame

router.delete(
  "/hive-frames/:id",
  authMiddleware,
  hiveFrameController.deleteHiveFrame
);

export default router;