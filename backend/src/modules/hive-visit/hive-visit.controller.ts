import {
  Request,
  Response,
  NextFunction,
} from "express";

import { hiveVisitService } from "./hive-visit.service.js";

export const hiveVisitController = {
  // Create
  async createHiveVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.hiveId as string;

      const visit =
        await hiveVisitService.createHiveVisit(
          hiveId,
          userId,
          req.body
        );

      return res.status(201).json({
        message: "Hive visit created successfully",
        visit,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all
  async getMyHiveVisits(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.hiveId as string;

      const visits =
        await hiveVisitService.getMyHiveVisits(
          hiveId,
          userId
        );

      return res.status(200).json({
        visits,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get one
  async getHiveVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const visitId = req.params.id as string;

      const visit =
        await hiveVisitService.getHiveVisit(
          visitId,
          userId
        );

      return res.status(200).json({
        visit,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update
  async updateHiveVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const visitId = req.params.id as string;

      const visit =
        await hiveVisitService.updateHiveVisit(
          visitId,
          userId,
          req.body
        );

      return res.status(200).json({
        message: "Hive visit updated successfully",
        visit,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete
  async deleteHiveVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const visitId = req.params.id as string;

      await hiveVisitService.deleteHiveVisit(
        visitId,
        userId
      );

      return res.status(200).json({
        message: "Hive visit deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};