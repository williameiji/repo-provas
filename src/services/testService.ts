import * as testRepository from "../repositories/testRepository.js";
import * as teacherDisciplineService from "../services/teachersDisiciplineService.js";
import * as teacherService from "../services/teacherService.js";
import * as disciplineService from "../services/disciplineService.js";
import * as categoryService from "../services/categoryService.js";
import * as termService from "../services/termService.js";

export async function newTest(data: {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}) {
	const { id: categoryId } = await categoryService.findByName(data.category);

	await teacherService.findByName(data.teacher);

	await disciplineService.findByName(data.discipline);

	const { id: teacherDisciplineId } =
		await teacherDisciplineService.findByNames(data.discipline, data.teacher);

	await testRepository.insert({
		name: data.name,
		pdfUrl: data.pdfUrl,
		categoryId,
		teacherDisciplineId,
	});
}

export async function sendTestsByDiscipline() {
	const data = await termService.sendTestsByDiscipline();

	return data;
}
