import { Request, Response } from "express";
import handleErrorAsync from "../middleware/handleErrorAsync";
import { AppError } from "../middleware/errorHandler";
import * as coachSkillService from "../services/coachSkillService";

export const getCoachSkill = handleErrorAsync(
  async (req: Request, res: Response) => {
    const creditPackages = await coachSkillService.getAll();
    res.status(200).json({ status: "success", data: creditPackages });
  },
);

export const createCoachSkill = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingSkill = await coachSkillService.check(name);
    if (existingSkill) {
      throw new AppError("資料重複", 409);
    }

    const newSkill = await coachSkillService.create(name);
    res.status(200).json({ status: "success", data: newSkill });
  },
);

export const deleteCoachSkill = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { skillId } = req.params;

    const existingSkill = await coachSkillService.getById(skillId);
    if (!existingSkill) {
      throw new AppError("ID錯誤", 400);
    }

    await coachSkillService.deleteById(skillId);
    res.status(200).json({
      status: "success",
    });
  },
);
