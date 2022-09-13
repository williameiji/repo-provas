import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function signup(req: Request, res: Response) {
	const data = req.body as {
		email: string;
		password: string;
		refPassword: string;
	};

	await authService.signup(data);

	res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
	const data = req.body as { email: string; password: string };

	const token = await authService.login(data);

	res.status(200).send(token);
}
