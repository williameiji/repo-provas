import * as termRepository from "../repositories/termRepository";
import { Discipline } from "../types/disciplineTypes";

export async function sendTestsByDiscipline() {
	const data = await termRepository.findTestsByDiscipline();

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

export function filterDataByCategory(category: Discipline[]) {
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
