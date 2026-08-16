import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";

export const userController = {
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const user = await userService.getProfile(userId);

      return res.status(200).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

     // const data = updateUserSchema.parse(req.body);

      const user = await userService.updateProfile(
        userId,
      //  data
        req.body
    );


      return res.status(200).json({
        message: "User profile updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const result = await userService.deleteAccount(userId);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};