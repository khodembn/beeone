import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../utils/app-error.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // Prisma Unique Constraint Error
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === "P2002"
  ) {
    return res.status(409).json({
      success: false,
      message:
        "A record with this value already exists",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};