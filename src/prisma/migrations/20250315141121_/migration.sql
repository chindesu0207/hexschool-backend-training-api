-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_user_id_fkey";

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "coachId" UUID;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "coach_link_skill" (
    "id" UUID NOT NULL,
    "coach_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_link_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_purchase" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "credit_package_id" UUID NOT NULL,
    "purchased_credits" INTEGER NOT NULL,
    "price_paid" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchase_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_booking" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "booking_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL,
    "join_at" TIMESTAMP(3),
    "leave_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "cancellation_reason" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coach_link_skill" ADD CONSTRAINT "coach_link_skill_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_link_skill" ADD CONSTRAINT "coach_link_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_purchase" ADD CONSTRAINT "credit_purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_purchase" ADD CONSTRAINT "credit_purchase_credit_package_id_fkey" FOREIGN KEY ("credit_package_id") REFERENCES "credit_package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_booking" ADD CONSTRAINT "course_booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_booking" ADD CONSTRAINT "course_booking_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
