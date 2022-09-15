import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";

export async function sendTeacherByDiscipline(req: Request, res: Response) {
	const { id } = req.params;

	const data = await teacherService.sendTeacherByDiscipline(Number(id));

	res.status(200).send(data);
}
