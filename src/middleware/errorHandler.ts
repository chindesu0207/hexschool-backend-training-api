import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "伺服器錯誤",
  });
};

export { errorHandler, AppError };
