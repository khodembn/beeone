import { Router } from "express";

import { queenController } from "./queen.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { createQueenSchema } from "./dto/create-queen.dto.js";

import { updateQueenSchema } from "./dto/update-queen.dto.js";

const router = Router();

// Create Queen

router.post(
  "/hives/:hiveId/queens",
  authMiddleware,
  validate(createQueenSchema),
  queenController.createQueen
);

// Get all Queens of a Hive

router.get(
  "/hives/:hiveId/queens",
  authMiddleware,
  queenController.getMyQueens
);

// Get one Queen

router.get(
  "/queens/:id",
  authMiddleware,
  queenController.getQueen
);

// Update Queen

router.patch(
  "/queens/:id",
  authMiddleware,
  validate(updateQueenSchema),
  queenController.updateQueen
);

// Delete Queen

router.delete(
  "/queens/:id",
  authMiddleware,
  queenController.deleteQueen
);

export default router;