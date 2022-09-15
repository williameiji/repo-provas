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
