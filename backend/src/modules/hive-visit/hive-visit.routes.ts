import { Router } from "express";

import { hiveVisitController } from "./hive-visit.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { createHiveVisitSchema } from "./dto/create-hive-visit.dto.js";

import { updateHiveVisitSchema } from "./dto/update-hive-visit.dto.js";

const router = Router();

// Create Hive Visit
router.post(
  "/hives/:hiveId/visits",
  authMiddleware,
  validate(createHiveVisitSchema),
  hiveVisitController.createHiveVisit
);

// Get all Visits of a Hive
router.get(
  "/hives/:hiveId/visits",
  authMiddleware,
  hiveVisitController.getMyHiveVisits
);

// Get one Hive Visit
router.get(
  "/hive-visits/:id",
  authMiddleware,
  hiveVisitController.getHiveVisit
);

// Update Hive Visit
router.patch(
  "/hive-visits/:id",
  authMiddleware,
  validate(updateHiveVisitSchema),
  hiveVisitController.updateHiveVisit
);

// Delete Hive Visit
router.delete(
  "/hive-visits/:id",
  authMiddleware,
  hiveVisitController.deleteHiveVisit
);

export default router;