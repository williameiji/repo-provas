import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository";
import { User } from "@prisma/client";

dotenv.config();

export async function signup(data: {
	email: string;
	password: string;
	refPassword: string;
}) {
	const user = await getUser(data.email);

	if (user) throw { code: "Conflict", message: "Usuário já cadastrado!" };

	const SALT = 10;

	const encryptedPassaword = bcrypt.hashSync(data.password, SALT);

	await userRepository.insert({
		email: data.email,
		password: encryptedPassaword,
	});
}

export async function login(data: userRepository.TUser) {
	const user = await getUser(data.email);

	if (!user) throw { code: "NotFound", message: "Usuário não encontrado!" };

	const token = await verifyPassword(user, data.password);

	return token;
}

async function getUser(email: string) {
	return await userRepository.findByEmail(email);
}

async function verifyPassword(user: User, password: string) {
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = await generateToken(user);

		return token;
	} else {
		throw { code: "Anauthorized", message: "Senha/Email incorreta" };
	}
}

async function generateToken(user: User) {
	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.SECRET_KEY_TOKEN,
		{ expiresIn: 60 * 60 }
	);

	return token;
}
