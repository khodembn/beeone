import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (payload: {
  userId: string;
  role: string;
}) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};