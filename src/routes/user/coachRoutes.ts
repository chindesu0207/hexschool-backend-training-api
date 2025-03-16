import { Router } from "express";
import { validateUUID } from "../../middleware/validateData";
import {
  getCoachDetail,
  getCoachList,
} from "../../controllers/coachController";

const router = Router();

router.get("/", getCoachList);
router.get("/:coachId", validateUUID, getCoachDetail);

export default router;
