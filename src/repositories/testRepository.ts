import prisma from "../databases/database";
import { Test } from "@prisma/client";

export type TTest = Omit<Test, "id" | "createdAt">;

export async function insert(data: TTest) {
	await prisma.test.create({ data });
}
