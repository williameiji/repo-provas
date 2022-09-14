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

	const dataFiltered = data.map((item) => {
		return {
			period: item.number,
			disciplines: item.discipline.map((disc) => {
				return {
					name: disc.name,
					category: [
						{
							projects: disc.teachersDisciplines[0].test
								.filter((test) => {
									return test.category.name === "Projeto";
								})
								.map((item) => {
									return {
										id: item.id,
										name: item.name,
										pdfUrl: item.pdfUrl,
										teacher: item.teacherDiscipline.teacher.name,
									};
								}),
							practices: disc.teachersDisciplines[0].test
								.filter((test) => {
									return test.category.name === "Prática";
								})
								.map((item) => {
									return {
										id: item.id,
										name: item.name,
										pdfUrl: item.pdfUrl,
										teacher: item.teacherDiscipline.teacher.name,
									};
								}),
							recuperation: disc.teachersDisciplines[0].test
								.filter((test) => {
									return test.category.name === "Recuperação";
								})
								.map((item) => {
									return {
										id: item.id,
										name: item.name,
										pdfUrl: item.pdfUrl,
										teacher: item.teacherDiscipline.teacher.name,
									};
								}),
						},
					],
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
