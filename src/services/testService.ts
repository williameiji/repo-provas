import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineService from "../services/teachersDisiciplineService";
import * as teacherService from "../services/teacherService";
import * as disciplineService from "../services/disciplineService";
import * as categoryService from "../services/categoryService";
import * as termService from "../services/termService";
import { Discipline } from "../types/disciplineTypes";

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

	const dataFiltered = data.map((item) => {
		return {
			period: item.number,
			disciplines: item.discipline.map((disc) => {
				return {
					name: disc.name,
					category: {
						projects: filterDataToProject(disc.teachersDisciplines[0].test),
						practices: filterDataToPractice(disc.teachersDisciplines[0].test),
						recuperation: filterDataToRecuperation(
							disc.teachersDisciplines[0].test
						),
					},
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

function filterDataToProject(project: Discipline[]) {
	return project
		.filter((test) => test.category.name === "Projeto")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.teacher.name,
				createdAt: item.createdAt,
			};
		});
}

function filterDataToPractice(practice: Discipline[]) {
	return practice
		.filter((test) => test.category.name === "Prática")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.teacher.name,
				createdAt: item.createdAt,
			};
		});
}

function filterDataToRecuperation(recuperation: Discipline[]) {
	return recuperation
		.filter((test) => test.category.name === "Recuperação")
		.map((item) => {
			return {
				name: item.name,
				discipline: item.teacherDiscipline.teacher.name,
				createdAt: item.createdAt,
			};
		});
}
