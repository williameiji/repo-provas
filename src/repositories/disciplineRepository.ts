import prisma from "../databases/database";

export async function findByName(name: string) {
	return await prisma.discipline.findFirst({
		where: { name },
	});
}

export async function sendTestsByDiscipline() {
	return await prisma.term.findMany({
		include: { discipline: true },
		orderBy: { id: "asc" },
	});
}
