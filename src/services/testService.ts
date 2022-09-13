import * as testRepository from "../repositories/testRepository.js";
import * as teacherDisciplineService from "../services/teachersDisiciplineService.js";

export async function newTest(data: {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}) {
	await teacherDisciplineService.findByName(data.discipline, data.teacher);
}
