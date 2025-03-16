import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";

const JWT_SECRET: string = String(process.env.JWT_SECRET);

export interface CustomRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const isAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("未授權，請提供 Token", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;

    console.log("✅ Token 驗證成功:", req.user);

    next();
  } catch (error) {
    console.error("❌ Token 驗證失敗:", error);
    next(new AppError("未授權的請求", 401));
  }
};
