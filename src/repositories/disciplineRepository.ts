import prisma from "../databases/database";
import { Discipline } from "@prisma/client";

export async function findByName(name: string) {
	return await prisma.discipline.findFirst({
		where: { name },
	});
}

export async function getAllDisciplines(): Promise<Discipline[]> {
	return await prisma.discipline.findMany();
}

export async function findTestsByDisciplineName(name: string) {
	return prisma.discipline.findMany({
		where: { name: { contains: name, mode: "insensitive" } },
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
	});
}
