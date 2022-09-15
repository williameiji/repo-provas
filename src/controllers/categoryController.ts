import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export async function sendCategories(req: Request, res: Response) {
	const data = await categoryService.sendCategories();

	res.status(200).send(data);
}
