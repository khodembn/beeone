import jwt from "jsonwebtoken";
import type { UserRole } from "../generated/prisma/enums.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export type JwtPayload = {
  userId: string;
  role: UserRole;
};

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (
    typeof decoded === "string" ||
    !decoded.userId ||
    !decoded.role
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId as string,
    role: decoded.role as UserRole,
  };
};