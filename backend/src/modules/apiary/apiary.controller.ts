import { Request, Response, NextFunction } from "express";
import { apiaryService } from "./apiary.service.js";

export const apiaryController = {
  async createApiary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const apiary = await apiaryService.createApiary(
        userId,
        req.body
      );

      return res.status(201).json({
        message: "Apiary created successfully",
        apiary,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMyApiaries(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const apiaries =
        await apiaryService.getMyApiaries(userId);

      return res.status(200).json({
        apiaries,
      });
    } catch (error) {
      next(error);
    }
  },

  async getApiary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const apiaryId = req.params.id as string;

      const apiary = await apiaryService.getApiary(
        apiaryId,
        userId
      );

      return res.status(200).json({
        apiary,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateApiary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const apiaryId = req.params.id as string;

      // Validation is handled by validate middleware
      const apiary = await apiaryService.updateApiary(
        apiaryId,
        userId,
        req.body
      );

      return res.status(200).json({
        message: "Apiary updated successfully",
        apiary,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteApiary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const apiaryId = req.params.id as string;

      const result = await apiaryService.deleteApiary(
        apiaryId,
        userId
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};