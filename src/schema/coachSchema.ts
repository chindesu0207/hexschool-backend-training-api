import { z } from "zod";

const experienceYearsSchema = z.number().int("教練年資必須是整數");

const descriptionSchema = z.string().min(1, "教練簡介不可為空");

const profileImageSchema = z
  .union([
    z
      .string()
      .trim()
      .regex(/\.(jpg|jpeg|png)$/i, "圖片網址必須是 .png 或 .jpg"),
    z.literal(""),
    z.null(),
  ])
  .transform((val) => (val === "" ? null : val))
  .optional();

export const createCoachSchema = z.object({
  experience_years: experienceYearsSchema,
  description: descriptionSchema,
  profile_image_url: profileImageSchema,
});
