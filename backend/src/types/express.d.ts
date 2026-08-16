import { UserRole } from "../generated/prisma/enums.js";

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};