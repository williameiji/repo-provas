import prisma from "../databases/database.js";

export async function findByName(name: string) {
	return await prisma.teacher.findFirst({
		where: { name },
	});
}

export async function findTestsByTeachers() {
	return await prisma.teacher.findMany({
		select: {
			id: true,
			name: true,
			teachersDisciplines: {
				select: {
					test: {
						select: {
							id: true,
							name: true,
							pdfUrl: true,
							category: { select: { name: true } },
							teacherDiscipline: {
								select: { discipline: { select: { name: true } } },
							},
						},
					},
				},
			},
		},
	});
}
