import { Router } from "express";
import { validateData, validateUUID } from "../../middleware/validateData";
import { isAuth } from "../../middleware/isAuth";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../../schema/courseSchema";
import { createCourse, updateCourse } from "../../controllers/courseController";

const router = Router();

router.post(
  "/",
  isAuth,
  validateData(createCourseSchema, "body"),
  createCourse,
);
router.put(
  "/:courseId",
  isAuth,
  validateUUID,
  validateData(updateCourseSchema, "body"),
  updateCourse,
);

export default router;
