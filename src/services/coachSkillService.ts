import prisma from "../prisma";

export const getAll = async () => {
  return await prisma.skill.findMany({
    omit: { created_at: true },
  });
};

export const getById = async (skillId: string) => {
  return await prisma.skill.findUnique({
    where: { id: skillId },
  });
};

export const check = async (name: string) => {
  return await prisma.skill.findUnique({
    where: { name },
  });
};

export const create = async (name: string) => {
  return await prisma.skill.create({
    data: { name },
    omit: { created_at: true },
  });
};

export const deleteById = async (skillId: string) => {
  return await prisma.skill.delete({
    where: { id: skillId },
  });
};
