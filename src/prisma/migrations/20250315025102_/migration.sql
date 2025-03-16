/*
  Warnings:

  - You are about to drop the column `coachId` on the `course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_coachId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_user_id_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "coachId";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "coach"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
