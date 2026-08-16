import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },
async login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
},

async changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.userId;

    const result = await authService.changePassword(
      userId,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
},
};