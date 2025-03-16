/*
  Warnings:

  - You are about to drop the column `coachId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the `coach_link_skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "coach_link_skill" DROP CONSTRAINT "coach_link_skill_coach_id_fkey";

-- DropForeignKey
ALTER TABLE "coach_link_skill" DROP CONSTRAINT "coach_link_skill_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_coachId_fkey";

-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_user_id_fkey";

-- AlterTable
ALTER TABLE "course" DROP COLUMN "coachId";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "coach_link_skill";

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "coach"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
