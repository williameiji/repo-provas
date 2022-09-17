import * as teacherRepository from "../repositories/teacherRepository";
import { Categories } from "../types/teachersType";

export async function findByName(name: string) {
	const teacher = await teacherRepository.findByName(name);

	if (!teacher)
		throw { code: "NotFound", message: "Professor(a) não encontrado(a)!" };

	return teacher;
}

export async function sendTeacherByDiscipline(id: number) {
	const teachers = await teacherRepository.getTeacherByDiscipline(id);

	return teachers;
}

export async function sendTestsByTeachers() {
	const data = await teacherRepository.findTestsByTeachers();

	const dataFiltered = data.map((item) => {
		return {
			id: item.id,
			teacher: item.name,
			categories: filterDataByCategory(item.teachersDisciplines[0].test),
		};
	});

	return dataFiltered;
}

export const CreateCategory = (
	name: string,
	pdfUrl: string,
	discipline: string,
	createdAt: Date
) => ({
	name,
	pdfUrl,
	discipline,
	createdAt,
});

function filterDataByCategory(category: Categories[]) {
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
					item.teacherDiscipline.discipline.name,
					item.createdAt
				)
			);
		}
		if (item.category.name === "Prática") {
			categories.practices.push(
				CreateCategory(
					item.name,
					item.pdfUrl,
					item.teacherDiscipline.discipline.name,
					item.createdAt
				)
			);
		}
		if (item.category.name === "Recuperação") {
			categories.recuperation.push(
				CreateCategory(
					item.name,
					item.pdfUrl,
					item.teacherDiscipline.discipline.name,
					item.createdAt
				)
			);
		}
	});

	return categories;
}
