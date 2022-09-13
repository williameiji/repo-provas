import prisma from "../databases/database.js";
import { Category, Test } from "@prisma/client";

export type TTest = Omit<Test, "id">;

export async function insert(data: TTest) {
	await prisma.test.create({ data });
}

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
