import { AppError } from "../middleware/errorHandler";
import prisma from "../prisma";

export const getAll = async () => {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      start_at: true,
      end_at: true,
      max_participants: true,
      coach: {
        select: {
          user: {
            select: { name: true },
          },
        },
      },
      skill: {
        select: { name: true },
      },
    },
  });

  return courses.map((course) => ({
    id: course.id,
    coach_name: course.coach?.user.name || "未知教練",
    skill_name: course.skill?.name || "未知技能",
    name: course.name,
    description: course.description,
    start_at: course.start_at,
    end_at: course.end_at,
    max_participants: course.max_participants,
  }));
};

export const create = async (courseData: {
  user_id: string;
  skill_id: string;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  max_participants: number;
  meeting_url?: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: courseData.user_id },
    include: { Coach: true },
  });

  if (!user) {
    throw new AppError("使用者不存在", 400);
  }

  if (!user.Coach) {
    throw new AppError("使用者尚未成為教練", 400);
  }

  const skill = await prisma.skill.findUnique({
    where: { id: courseData.skill_id },
  });

  if (!skill) {
    throw new AppError("專長不存在", 400);
  }

  const newCourse = await prisma.course.create({
    data: {
      user_id: courseData.user_id,
      skill_id: courseData.skill_id,
      name: courseData.name,
      description: courseData.description,
      start_at: new Date(courseData.start_at),
      end_at: new Date(courseData.end_at),
      max_participants: courseData.max_participants,
      meeting_url: courseData.meeting_url || null,
    },
  });

  return newCourse;
};

export const update = async (
  courseId: string,
  courseData: {
    skill_id: string;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    max_participants: number;
    meeting_url: string | null;
  },
) => {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!existingCourse) {
    throw new AppError("課程不存在", 400);
  }

  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data: {
      skill_id: courseData.skill_id,
      name: courseData.name,
      description: courseData.description,
      start_at: new Date(courseData.start_at),
      end_at: new Date(courseData.end_at),
      max_participants: courseData.max_participants,
      meeting_url: courseData.meeting_url,
    },
  });

  if (!updatedCourse) {
    throw new AppError("更新課程失敗", 400);
  }

  return updatedCourse;
};
