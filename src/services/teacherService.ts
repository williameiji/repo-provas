import * as teacherRepository from "../repositories/teacherRepository.js";

export async function findByName(name: string) {
	const teacher = await teacherRepository.findByName(name);

	if (!teacher)
		throw { code: "NotFound", message: "Professor(a) não encontrado(a)!" };

	return teacher;
}

export async function sendTestsByTeachers() {
	const data = await teacherRepository.findTestsByTeachers();

	const data2 = data.map((item) => {
		return {
			id: item.id,
			teacher: item.name,
			categories: [
				{
					projects: item.teachersDisciplines[0].test
						.filter((test) => {
							return test.category.name === "Projeto";
						})
						.map((item) => {
							return {
								id: item.id,
								name: item.name,
								pdfUrl: item.pdfUrl,
								discipline: item.teacherDiscipline.discipline.name,
							};
						}),
					practices: item.teachersDisciplines[0].test
						.filter((test) => {
							return test.category.name === "Prática";
						})
						.map((item) => {
							return {
								id: item.id,
								name: item.name,
								pdfUrl: item.pdfUrl,
								discipline: item.teacherDiscipline.discipline.name,
							};
						}),
					recuperation: item.teachersDisciplines[0].test
						.filter((test) => {
							return test.category.name === "Recuperação";
						})
						.map((item) => {
							return {
								id: item.id,
								name: item.name,
								pdfUrl: item.pdfUrl,
								discipline: item.teacherDiscipline.discipline.name,
							};
						}),
				},
			],
		};
	});

	return data2;
}
