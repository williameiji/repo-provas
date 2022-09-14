import { Request, Response } from "express";
import * as testService from "../services/testService";

export async function newTest(req: Request, res: Response) {
	const data = req.body;

	await testService.newTest(data);

	res.sendStatus(201);
}

export async function sendTestsByDiscipline(req: Request, res: Response) {
	const data = await testService.sendTestsByDiscipline();

	res.status(200).send(data);
}

export async function sendTestsByTeachers(req: Request, res: Response) {
	const data = await testService.sendTestsByTeachers();

	res.status(200).send(data);
}
