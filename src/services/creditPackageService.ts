import { AppError } from "../middleware/errorHandler";
import prisma from "../prisma";

export const getAll = async () => {
  return await prisma.creditPackage.findMany({
    omit: { created_at: true },
  });
};

export const getById = async (creditPackageId: string) => {
  return await prisma.creditPackage.findUnique({
    where: { id: creditPackageId },
  });
};

export const check = async (name: string) => {
  return await prisma.creditPackage.findUnique({
    where: { name },
  });
};

export const create = async (
  name: string,
  credit_amount: number,
  price: number,
) => {
  return await prisma.creditPackage.create({
    data: { name, credit_amount, price },
    omit: { created_at: true },
  });
};

export const deleteById = async (creditPackageId: string) => {
  return await prisma.creditPackage.delete({
    where: { id: creditPackageId },
  });
};

export const purchase = async (userId: string, creditPackageId: string) => {
  const creditPackage = await prisma.creditPackage.findUnique({
    where: { id: creditPackageId },
    select: {
      credit_amount: true,
      price: true,
    },
  });

  if (!creditPackage) {
    throw new AppError("指定的購買方案不存在", 404);
  }

  return await prisma.creditPurchase.create({
    data: {
      user_id: userId,
      credit_package_id: creditPackageId,
      purchased_credits: creditPackage.credit_amount,
      price_paid: creditPackage.price,
    },
  });
};
