import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, "名稱至少需要 2 個字")
  .max(10, "名稱最多只能 10 個字")
  .regex(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, "名稱不可包含特殊符號或空白");

const emailSchema = z.string().email("請輸入有效的 Email");

const passwordSchema = z
  .string()
  .min(8, "密碼至少需要 8 個字")
  .max(16, "密碼最多只能 16 個字")
  .regex(/[A-Z]/, "密碼需包含至少 1 個大寫字母")
  .regex(/[a-z]/, "密碼需包含至少 1 個小寫字母")
  .regex(/\d/, "密碼需包含至少 1 個數字");

export const userSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const editProfileSchema = z.object({
  name: nameSchema,
});
