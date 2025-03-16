import { AppError } from "../middleware/errorHandler";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_EXPIRES_DAY: number = Number(process.env.JWT_EXPIRES_DAY);
const JWT_SECRET: string = String(process.env.JWT_SECRET);

export const getUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      name: true,
    },
  });
};

export const check = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const create = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
    omit: { role: true, created_at: true, updated_at: true },
  });
};

export const validatePasswordFormat = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  return passwordRegex.test(password);
};

export const login = async (email: string, password: string) => {
  if (!validatePasswordFormat(password)) {
    throw new AppError(
      "密碼不符合規則，需要包含英文數字大小寫，最短8個字，最長16個字",
      400,
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("使用者不存在或密碼輸入錯誤", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("使用者不存在或密碼輸入錯誤", 400);
  }
  console.log(JWT_SECRET, JWT_EXPIRES_DAY);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_DAY,
    },
  );

  return {
    token,
    user: { name: user.name },
  };
};

export const update = async (
  userId: string,
  name: string,
): Promise<boolean> => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  return updatedUser ? true : false;
};
