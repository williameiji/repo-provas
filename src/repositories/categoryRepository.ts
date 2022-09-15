import prisma from "../databases/database";
import { Category } from "@prisma/client";

export async function findByName(name: string) {
	return await prisma.category.findFirst({ where: { name } });
}

export async function getAllCategories(): Promise<Category[]> {
	return await prisma.category.findMany();
}
