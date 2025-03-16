import { Router } from "express";
import { validateData, validateUUID } from "../../middleware/validateData";
import { createCoachSchema } from "../../schema/coachSchema";
import { promoteCoach } from "../../controllers/coachController";

const router = Router();

router.post(
  "/:userId",
  validateUUID,
  validateData(createCoachSchema, "body"),
  promoteCoach,
);

export default router;
