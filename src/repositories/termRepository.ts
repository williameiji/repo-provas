import prisma from "../databases/database";

export async function findTestsByDiscipline() {
	return prisma.term.findMany({
		select: {
			number: true,
			discipline: {
				select: {
					name: true,
					teachersDisciplines: {
						select: {
							test: {
								select: {
									teacherDiscipline: {
										select: { teacher: { select: { name: true } } },
									},
									id: true,
									name: true,
									pdfUrl: true,
									createdAt: true,
									category: { select: { name: true } },
								},
							},
						},
					},
				},
			},
		},
	});
}
