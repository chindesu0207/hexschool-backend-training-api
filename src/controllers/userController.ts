import { Request, Response } from "express";
import handleErrorAsync from "../middleware/handleErrorAsync";
import { AppError } from "../middleware/errorHandler";
import * as userService from "../services/userService";
import { CustomRequest } from "../middleware/isAuth";

export const getProfile = handleErrorAsync(
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ status: "fail", message: "未授權" });
      return;
    }

    const user = await userService.getUser(req.user.email);

    if (!user) {
      res.status(404).json({ status: "fail", message: "使用者不存在" });
      return;
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  },
);

export const signup = handleErrorAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = await userService.check(email);
  if (existingUser) {
    throw new AppError("Email已被使用", 409);
  }

  const newUser = await userService.create(name, email, password, role);
  res.status(201).json({ status: "success", data: newUser });
});

export const signin = handleErrorAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  res.status(201).json({
    status: "success",
    data: result,
  });
});

export const updateProfile = handleErrorAsync(
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ status: "fail", message: "未授權" });
      return;
    }

    const { name } = req.body;

    const success = await userService.update(req.user.id, name);

    if (!success) {
      res.status(400).json({ status: "fail", message: "更新使用者失敗" });
      return;
    }

    res.status(200).json({ status: "success" });
  },
);
