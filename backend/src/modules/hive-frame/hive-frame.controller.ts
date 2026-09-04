import { Request, Response, NextFunction } from "express";

import { hiveFrameService } from "./hive-frame.service.js";

export const hiveFrameController = {
  // Create
  async createHiveFrame(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.hiveId as string;

      const frame = await hiveFrameService.createHiveFrame(
        hiveId,
        userId,
        req.body
      );

      return res.status(201).json({
        message: "Hive frame created successfully",
        frame,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all
  async getMyHiveFrames(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const hiveId = req.params.hiveId as string;

      const frames = await hiveFrameService.getMyHiveFrames(
        hiveId,
        userId
      );

      return res.status(200).json({
        frames,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get one
  async getHiveFrame(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const frameId = req.params.id as string;

      const frame = await hiveFrameService.getHiveFrame(
        frameId,
        userId
      );

      return res.status(200).json({
        frame,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update
  async updateHiveFrame(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const frameId = req.params.id as string;

      // Validation is handled by validate middleware
      const frame = await hiveFrameService.updateHiveFrame(
        frameId,
        userId,
        req.body
      );

      return res.status(200).json({
        message: "Hive frame updated successfully",
        frame,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete
  async deleteHiveFrame(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;
      const frameId = req.params.id as string;

      const result = await hiveFrameService.deleteHiveFrame(
        frameId,
        userId
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};