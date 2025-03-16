import { Request, Response } from "express";
import handleErrorAsync from "../middleware/handleErrorAsync";
import * as coachService from "../services/coachService";
import { AppError } from "../middleware/errorHandler";

export const getCoachList = handleErrorAsync(
  async (req: Request, res: Response) => {
    const per = parseInt(req.query.per as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    if (per <= 0 || page <= 0) {
      throw new AppError("per 和 page 必須是正整數", 400);
    }

    const { coaches, totalCoaches, totalPages, currentPage, perPage } =
      await coachService.getList(per, page);
    res.status(200).json({
      status: "success",
      data: coaches,
      totalCoaches,
      totalPages,
      currentPage,
      perPage,
    });
  },
);

export const getCoachDetail = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { coachId } = req.params;

    const result = await coachService.getById(coachId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  },
);

export const promoteCoach = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { experience_years, description, profile_image_url } = req.body;

    const { user, coach } = await coachService.promoteUserToCoach(
      userId,
      experience_years,
      description,
      profile_image_url,
    );

    res.status(201).json({
      status: "success",
      data: {
        user: {
          name: user.name,
          role: user.role,
        },
        coach,
      },
    });
  },
);
