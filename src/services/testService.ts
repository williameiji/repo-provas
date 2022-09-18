import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineService from "../services/teachersDisiciplineService";
import * as teacherService from "../services/teacherService";
import * as disciplineService from "../services/disciplineService";
import * as categoryService from "../services/categoryService";
import * as termService from "../services/termService";
import { Discipline } from "../types/disciplineTypes";
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

	const dataFiltered = data.map((item) => {
		return {
			period: item.number,
			disciplines: item.discipline.map((disc) => {
				return {
					name: disc.name,
					category: filterDataByCategory(disc.teachersDisciplines[0].test),
				};
			}),
		};
	});

	return dataFiltered;
}

export async function sendTestsByTeachers() {
	const data = await teacherService.sendTestsByTeachers();

	return data;
}

export async function sendTestsByTeachersName(name: string) {
	const data = await teacherService.sendTestsByTeachersName(name);

	return data;
}

export const CreateCategory = (
	name: string,
	pdfUrl: string,
	teacher: string,
	createdAt: Date
) => ({
	name,
	pdfUrl,
	teacher,
	createdAt,
});

function filterDataByCategory(category: Discipline[]) {
	const categories = {
		projects: [],
		practices: [],
		recuperation: [],
	};

	category.map((item) => {
		if (item.category.name === "Projeto") {
			categories.projects.push(
				CreateCategory(
					item.name,
					item.pdfUrl,
					item.teacherDiscipline.teacher.name,
					item.createdAt
				)
			);
		}
		if (item.category.name === "Prática") {
			categories.practices.push(
				CreateCategory(
					item.name,
					item.pdfUrl,
					item.teacherDiscipline.teacher.name,
					item.createdAt
				)
			);
		}
		if (item.category.name === "Recuperação") {
			categories.recuperation.push(
				CreateCategory(
					item.name,
					item.pdfUrl,
					item.teacherDiscipline.teacher.name,
					item.createdAt
				)
			);
		}
	});

	return categories;
}
