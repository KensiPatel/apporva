import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-utils";
import type { Role } from "../types/user.type";

const roleLevel: Record<Role, number> = {
  employee: 0,
  manager: 1,
  admin: 2,
};

export function authMiddleware(requiredRole?: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = verifyToken(token) as {
        id: number;
        role: Role;
      };

      // attach user safely using type assertion
      (req as any).user = {
        id: decoded.id,
        role: decoded.role,
      };

      if (
        requiredRole &&
        roleLevel[decoded.role] < roleLevel[requiredRole]
      ) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}