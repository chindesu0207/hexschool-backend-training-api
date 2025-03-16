import { Router } from "express";
import { getCourseList } from "../../controllers/courseController";

const router = Router();

router.get("/", getCourseList);

export default router;
