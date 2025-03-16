import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";
import { AppError } from "./errorHandler";

type ReqPropertyType = "body" | "params" | "query";

const uuidSchema = z.string().uuid({ message: "提供的 ID 格式無效" });

export const validateData = <T>(
  schema: ZodSchema<T>,
  property: ReqPropertyType,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await schema.safeParseAsync(req[property]);

    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) =>
          err.message === "Required" ? err.path.join(".") : err.message,
        )
        .join(", ");

      return next(new AppError(`${errorMessage}，欄位未填寫正確`, 400));
    }

    req[property] = result.data;
    next();
  };
};

export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  for (const [key, value] of Object.entries(req.params)) {
    const result = uuidSchema.safeParse(value);
    if (!result.success) {
      return next(new AppError(`提供的 ${key} 格式無效，應為 UUID`, 400));
    }
  }
  next();
};
