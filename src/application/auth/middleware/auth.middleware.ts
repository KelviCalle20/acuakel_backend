import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config/jwt";

export interface JwtUserPayload {
  id: number;
  correo: string;
  roles: string[];
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, jwtConfig.secret) as JwtUserPayload;

    (req as any).user = payload;

    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export const checkRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtUserPayload;

    if (!user || !user.roles.includes(requiredRole)) {
      return res.sendStatus(403);
    }

    next();
  };
};
