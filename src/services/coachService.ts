import prisma from "../prisma";
import { AppError } from "../middleware/errorHandler";

export const getList = async (per: number, page: number) => {
  const skip = (page - 1) * per;

  const totalCoaches = await prisma.user.count({
    where: { Coach: { isNot: null } },
  });

  const coaches = await prisma.coach.findMany({
    skip,
    take: per,
    select: {
      id: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const formattedCoaches = coaches.map((coach) => ({
    id: coach.id,
    name: coach.user.name,
  }));

  return {
    coaches: formattedCoaches,
    totalCoaches,
    totalPages: Math.ceil(totalCoaches / per),
    currentPage: page,
    perPage: per,
  };
};

export const getById = async (coachId: string) => {
  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    include: {
      user: {
        select: { name: true, role: true },
      },
    },
  });

  if (!coach) {
    throw new AppError("找不到該教練", 400);
  }

  return {
    user: {
      name: coach.user.name,
      role: coach.user.role,
    },
    coach: {
      id: coach.id,
      user_id: coach.user_id,
      experience_years: coach.experience_years,
      description: coach.description,
      profile_image_url: coach.profile_image_url,
      created_at: coach.created_at,
      updated_at: coach.updated_at,
    },
  };
};

export const promoteUserToCoach = async (
  userId: string,
  experience_years: number,
  description: string,
  profile_image_url?: string,
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError("使用者不存在", 400);
  }

  const existingCoach = await prisma.coach.findUnique({
    where: { user_id: userId },
  });
  if (existingCoach) {
    throw new AppError("使用者已經是教練", 409);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: "COACH" },
  });

  if (!updatedUser) {
    throw new AppError("更新使用者失敗", 400);
  }

  const newCoach = await prisma.coach.create({
    data: {
      user_id: userId,
      experience_years,
      description,
      profile_image_url: profile_image_url || "",
    },
  });

  if (!newCoach) {
    throw new AppError("創建教練資料失敗", 400);
  }

  return { user: updatedUser, coach: newCoach };
};
