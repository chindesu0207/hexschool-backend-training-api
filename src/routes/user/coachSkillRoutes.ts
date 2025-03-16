import { Router } from "express";
import { validateData, validateUUID } from "../../middleware/validateData";
import coachSkillSchema from "../../schema/coachSkillSchema";
import {
  createCoachSkill,
  deleteCoachSkill,
  getCoachSkill,
} from "../../controllers/coachSkillController";

const router = Router();

router.get("/", getCoachSkill);
router.post("/", validateData(coachSkillSchema, "body"), createCoachSkill);

router.delete("/:skillId", validateUUID, deleteCoachSkill);

export default router;
