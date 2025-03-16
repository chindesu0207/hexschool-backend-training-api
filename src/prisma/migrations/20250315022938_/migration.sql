-- AlterTable
ALTER TABLE "course" ADD COLUMN     "coachId" UUID;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
