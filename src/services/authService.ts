import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as userRepository from "../repositories/userRepository";
import { User } from "@prisma/client";
import { TUser } from "../types/userTypes";
import axios from "axios";

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

export async function getAllUsers() {
	return await userRepository.getAllUsers();
}

async function verifyPassword(user: User, password: string) {
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = await generateToken(user);

		return token;
	} else {
		throw { code: "Anauthorized", message: "Senha/Email incorreta" };
	}
}

async function generateToken(user: TUser) {
	const token = jwt.sign(
		{
			id: user?.id || user.email,
		},
		process.env.SECRET_KEY_TOKEN,
		{ expiresIn: 60 * 60 }
	);

	return token;
}

export async function loginGit(code: string) {
	const access_token = await getAccessTokenFromGithub(code);

	const userData = await getUserDataFromGithub(access_token);

	const user = await userRepository.findByEmail(userData.data.email);

	if (user)
		throw {
			code: "Conflict",
			message: "Email cadastrado, por favor use a conta do sistema",
		};

	const token = await generateToken(userData.data);

	return token;
}

async function getAccessTokenFromGithub(code: string) {
	const body = {
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
		code,
		redirect_uri: process.env.REDIRECT_URI,
	};

	const { data } = await axios.post(
		"https://github.com/login/oauth/access_token",
		body
	);

	let params = new URLSearchParams(data);
	const access_token = params.get("access_token");

	if (!access_token) {
		throw {
			code: "NotFound",
			message: "Erro no login",
		};
	}

	return access_token;
}

async function getUserDataFromGithub(access_token: string) {
	const userData = await axios.get("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (userData.status !== 200) {
		throw {
			code: "NotFound",
			message: "Erro no login",
		};
	}

	return userData;
}
