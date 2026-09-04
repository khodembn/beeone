import { Request, Response, NextFunction } from "express";

import { queenService } from "./queen.service.js";

export const queenController = {

  // Create

  async createQueen(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const userId = req.user!.userId;

      const hiveId =
        req.params.hiveId as string;

      const queen =
        await queenService.createQueen(
          hiveId,
          userId,
          req.body
        );

      return res.status(201).json({
        message: "Queen created successfully",
        queen,
      });

    } catch (error) {

      next(error);
    }
  },


  // Get all

  async getMyQueens(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const userId = req.user!.userId;

      const hiveId =
        req.params.hiveId as string;

      const queens =
        await queenService.getMyQueens(
          hiveId,
          userId
        );

      return res.status(200).json({
        queens,
      });

    } catch (error) {

      next(error);
    }
  },


  // Get one

  async getQueen(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const userId = req.user!.userId;

      const queenId =
        req.params.id as string;

      const queen =
        await queenService.getQueen(
          queenId,
          userId
        );

      return res.status(200).json({
        queen,
      });

    } catch (error) {

      next(error);
    }
  },


  // Update

  async updateQueen(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const userId = req.user!.userId;

      const queenId =
        req.params.id as string;

      // Validation is handled by validate middleware

      const queen =
        await queenService.updateQueen(
          queenId,
          userId,
          req.body
        );

      return res.status(200).json({
        message: "Queen updated successfully",
        queen,
      });

    } catch (error) {

      next(error);
    }
  },


  // Delete

  async deleteQueen(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const userId = req.user!.userId;

      const queenId =
        req.params.id as string;

      const result =
        await queenService.deleteQueen(
          queenId,
          userId
        );

      return res.status(200).json(result);

    } catch (error) {

      next(error);
    }
  },

};