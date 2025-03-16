import { z } from "zod";

const creditPackageSchema = z.object({
  name: z.string().min(1, "name 不可為空").max(50, "name 長度不可超過 50"),
  credit_amount: z.number().int().positive("amount 必須為正整數"),
  price: z.number().positive("price 必須為正數"),
});

export default creditPackageSchema;
