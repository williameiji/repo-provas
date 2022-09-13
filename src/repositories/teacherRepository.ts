import prisma from "../databases/database.js";

export async function findByName(name: string) {
	return await prisma.teacher.findFirst({
		where: { name },
	});
}

export async function findTestsByTeachers() {
	return await prisma.teacher.findMany({
		include: {
			teachersDisciplines: {
				include: {
					discipline: true,
					test: { include: { category: true } },
				},
			},
		},
	});
}
