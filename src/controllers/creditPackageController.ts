import { Request, Response } from "express";
import handleErrorAsync from "../middleware/handleErrorAsync";
import { AppError } from "../middleware/errorHandler";
import * as creditPackageService from "../services/creditPackageService";
import { CustomRequest } from "../middleware/isAuth";

export const getCreditPackages = handleErrorAsync(
  async (req: Request, res: Response) => {
    const creditPackages = await creditPackageService.getAll();
    res.status(200).json({ status: "success", data: creditPackages });
  },
);

export const createCreditPackage = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { name, credit_amount, price } = req.body;

    const existingPackage = await creditPackageService.check(name);
    if (existingPackage) {
      throw new AppError("資料重複", 409);
    }

    const newPackage = await creditPackageService.create(
      name,
      credit_amount,
      price,
    );
    res.status(200).json({ status: "success", data: newPackage });
  },
);

export const deleteCreditPackage = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { creditPackageId } = req.params;

    const existingPackage = await creditPackageService.getById(creditPackageId);
    if (!existingPackage) {
      throw new AppError("ID錯誤", 400);
    }

    await creditPackageService.deleteById(creditPackageId);
    res.status(200).json({
      status: "success",
    });
  },
);

export const purchaseCreditPackage = handleErrorAsync(
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("未授權", 401);
    }

    const { creditPackageId } = req.params;

    const creditPackage = await creditPackageService.getById(creditPackageId);
    if (!creditPackage) {
      throw new AppError("指定的購買方案不存在", 404);
    }

    await creditPackageService.purchase(req.user.id, creditPackageId);

    res.status(201).json({
      status: "success",
      data: null,
    });
  },
);
