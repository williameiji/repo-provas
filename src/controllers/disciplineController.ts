import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService";

export async function sendAllDisciplines(req: Request, res: Response) {
	const data = await disciplineService.sendAllDisciplines();

	res.status(200).send(data);
}
