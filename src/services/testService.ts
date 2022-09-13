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

	const data2 = data.map((item) => {
		return {
			period: item.number,
			disciplines: item.discipline.map((disc) => {
				return {
					name: disc.name,
					teacher: disc.teachersDisciplines[0].teacher.name,
					category: [
						{
							projects: disc.teachersDisciplines[0].test
								.map((test) => test)
								.filter((test) => {
									return test.category.name === "Projeto";
								}),
							practices: disc.teachersDisciplines[0].test
								.map((test) => test)
								.filter((test) => {
									return test.category.name === "Prática";
								}),
							recuperation: disc.teachersDisciplines[0].test
								.map((test) => test)
								.filter((test) => {
									return test.category.name === "Recuperação";
								}),
						},
					],
				};
			}),
		};
	});

	return data2;
}

export async function sendTestsByTeachers() {
	const data = await teacherDisciplineService.sendTestsByTeachers();

	return data;
}
