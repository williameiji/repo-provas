import prisma from "../databases/database";

export async function findByName(name: string) {
	return await prisma.category.findFirst({ where: { name } });
}
