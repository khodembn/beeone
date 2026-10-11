import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { diseaseService } from "./disease.service.js";

export const diseaseController = {
  // Create Disease
  async createDisease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveVisitId = req.params.hiveVisitId as string;

      const disease = await diseaseService.createDisease(
        hiveVisitId,
        userId,
        req.body
      );

      return res.status(201).json({
        message: "Disease created successfully",
        disease,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all Diseases of a Hive Visit
  async getMyDiseases(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveVisitId = req.params.hiveVisitId as string;

      const diseases = await diseaseService.getMyDiseases(
        hiveVisitId,
        userId
      );

      return res.status(200).json({ diseases });
    } catch (error) {
      next(error);
    }
  },

  // Get one Disease
  async getDisease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const diseaseId = req.params.id as string;

      const disease = await diseaseService.getDisease(
        diseaseId,
        userId
      );

      return res.status(200).json({ disease });
    } catch (error) {
      next(error);
    }
  },

  // Update Disease
  async updateDisease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const diseaseId = req.params.id as string;

      const disease = await diseaseService.updateDisease(
        diseaseId,
        userId,
        req.body
      );

      return res.status(200).json({
        message: "Disease updated successfully",
        disease,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete Disease
  async deleteDisease(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const diseaseId = req.params.id as string;

      await diseaseService.deleteDisease(
        diseaseId,
        userId
      );

      return res.status(200).json({
        message: "Disease deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
