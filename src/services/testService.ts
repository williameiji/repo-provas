import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineService from "../services/teachersDisiciplineService";
import * as teacherService from "../services/teacherService";
import * as disciplineService from "../services/disciplineService";
import * as categoryService from "../services/categoryService";
import * as termService from "../services/termService";

import { sendEmails } from "../utils/sendEmails";

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

	sendEmails(data);
}

export async function sendTestsByDiscipline() {
	const data = await termService.sendTestsByDiscipline();

	return data;
}

export async function sendTestsByTeachers() {
	const data = await teacherService.sendTestsByTeachers();

	return data;
}

export async function sendTestsByTeachersName(name: string) {
	const data = await teacherService.sendTestsByTeachersName(name);

	return data;
}

export async function sendTestsByDisciplineName(name: string) {
	const data = await disciplineService.sendTestsByDisciplineName(name);

	return data;
}
