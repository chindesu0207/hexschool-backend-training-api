import { z } from "zod";

const userIdSchema = z.string().uuid("使用者 ID 格式錯誤");

const skillIdSchema = z.string().uuid("專長 ID 格式錯誤");

const nameSchema = z.string().min(1, "課程名稱不可為空");

const descriptionSchema = z.string().min(1, "課程介紹不可為空");

const dateTimeSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    "日期格式錯誤，應為 YYYY-MM-DD HH:mm:ss",
  );

const maxParticipantsSchema = z
  .number()
  .int("最大上課人數必須是整數")
  .positive("人數必須大於 0");

const meetingUrlSchema = z.string().url("無效的會議連結網址").optional();

export const createCourseSchema = z.object({
  user_id: userIdSchema,
  skill_id: skillIdSchema,
  name: nameSchema,
  description: descriptionSchema,
  start_at: dateTimeSchema,
  end_at: dateTimeSchema,
  max_participants: maxParticipantsSchema,
  meeting_url: meetingUrlSchema,
});

export const updateCourseSchema = z.object({
  user_id: userIdSchema,
  skill_id: skillIdSchema,
  name: nameSchema,
  description: descriptionSchema,
  start_at: dateTimeSchema,
  end_at: dateTimeSchema,
  max_participants: maxParticipantsSchema,
  meeting_url: meetingUrlSchema,
});
