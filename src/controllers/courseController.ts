import { Request, Response } from "express";
import handleErrorAsync from "../middleware/handleErrorAsync";
import * as courseService from "../services/courseService";

export const getCourseList = handleErrorAsync(
  async (req: Request, res: Response) => {
    const courses = await courseService.getAll();

    res.status(200).json({
      status: "success",
      data: courses,
    });
  },
);

export const createCourse = handleErrorAsync(
  async (req: Request, res: Response) => {
    const courseData = req.body;

    const course = await courseService.create(courseData);

    res.status(201).json({
      status: "success",
      data: { course },
    });
  },
);

export const updateCourse = handleErrorAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const courseData = req.body;

    const course = await courseService.update(courseId, courseData);

    res.status(200).json({
      status: "success",
      data: { course },
    });
  },
);
