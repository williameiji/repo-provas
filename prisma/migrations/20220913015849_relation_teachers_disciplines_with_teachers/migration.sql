-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
