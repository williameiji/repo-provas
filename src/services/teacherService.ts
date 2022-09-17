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
			categories: {
				projects: filterDataToProject(item.teachersDisciplines[0].test),
				practices: filterDataToPractice(item.teachersDisciplines[0].test),
				recuperation: filterDataToRecuperation(
					item.teachersDisciplines[0].test
				),
			},
		};
	});

	return dataFiltered;
}

function filterDataToProject(project: Categories[]) {
	return project
		.filter((test) => test.category.name === "Projeto")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.discipline.name,
				createdAt: item.createdAt,
			};
		});
}

function filterDataToPractice(practice: Categories[]) {
	return practice
		.filter((test) => test.category.name === "Prática")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.discipline.name,
				createdAt: item.createdAt,
			};
		});
}

function filterDataToRecuperation(recuperation: Categories[]) {
	return recuperation
		.filter((test) => test.category.name === "Recuperação")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.discipline.name,
				createdAt: item.createdAt,
			};
		});
}
