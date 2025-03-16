import { z } from "zod";

const coachSkillSchema = z.object({
  name: z.string().min(1, "name 不可為空").max(50, "name 長度不可超過 50"),
});

export default coachSkillSchema;
