import { Request, Response, NextFunction } from "express";

import { hiveService } from "./hive.service.js";

export const hiveController = {

  async createHive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const apiaryId = req.params.apiaryId as string;

      const hive = await hiveService.createHive(
        apiaryId,
        userId,
        req.body
      );

      return res.status(201).json({
        message: "Hive created successfully",
        hive,
      });
    } catch (error) {
      next(error);
    }
  },

  async getMyHives(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const apiaryId = req.params.apiaryId as string;

      const hives = await hiveService.getMyHives(
        apiaryId,
        userId
      );

      return res.status(200).json({
        hives,
      });
    } catch (error) {
      next(error);
    }
  },

  async getHive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.id as string;

      const hive = await hiveService.getHive(
        hiveId,
        userId
      );

      return res.status(200).json({
        hive,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateHive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.id as string;

      const hive = await hiveService.updateHive(
        hiveId,
        userId,
        req.body
      );

      return res.status(200).json({
        message: "Hive updated successfully",
        hive,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteHive(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.id as string;

      const result = await hiveService.deleteHive(
        hiveId,
        userId
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};