import prisma from "../databases/database.js";

export async function findTestsByDiscipline() {
	return prisma.term.findMany({
		include: {
			discipline: {
				include: {
					teachersDisciplines: {
						include: {
							teacher: true,
							test: {
								include: {
									category: true,
								},
							},
						},
					},
				},
			},
		},
	});
}
