import prisma from "../databases/database.js";
import { User } from "@prisma/client";

export type TUser = Omit<User, "id">;

export async function findByEmail(email: string): Promise<User> {
	return await prisma.user.findUnique({ where: { email } });
}

export async function insert(data: TUser) {
	await prisma.user.create({ data });
}
