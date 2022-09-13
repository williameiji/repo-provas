/*
  Warnings:

  - You are about to drop the column `teacherID` on the `teachersDisciplines` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `teachersDisciplines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_teacherID_fkey";

-- AlterTable
ALTER TABLE "teachersDisciplines" DROP COLUMN "teacherID",
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
