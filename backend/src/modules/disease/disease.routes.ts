
import { Router } from "express";

import { diseaseController } from "./disease.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

import { createDiseaseSchema } from "./dto/create-disease.dto.js";
import { updateDiseaseSchema } from "./dto/update-disease.dto.js";

const router = Router();

// Create Disease
router.post(
  "/hive-visits/:hiveVisitId/diseases",
  authMiddleware,
  validate(createDiseaseSchema),
  diseaseController.createDisease
);

// Get all Diseases of a Hive Visit
router.get(
  "/hive-visits/:hiveVisitId/diseases",
  authMiddleware,
  diseaseController.getMyDiseases
);

// Get one Disease
router.get(
  "/diseases/:id",
  authMiddleware,
  diseaseController.getDisease
);

// Update Disease
router.patch(
  "/diseases/:id",
  authMiddleware,
  validate(updateDiseaseSchema),
  diseaseController.updateDisease
);

// Delete Disease
router.delete(
  "/diseases/:id",
  authMiddleware,
  diseaseController.deleteDisease
);

export default router;
