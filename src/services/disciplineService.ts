import * as disciplineRepository from "../repositories/disciplineRepository";
import * as termService from "../services/termService";

export async function findByName(name: string) {
	const discipline = await disciplineRepository.findByName(name);

	if (!discipline)
		throw { code: "NotFound", message: "Disciplina não encontrada!" };

	return discipline;
}

export async function sendAllDisciplines() {
	const disciplines = await disciplineRepository.getAllDisciplines();

	return disciplines;
}

export async function sendTestsByDisciplineName(name: string) {
	const discipline = await disciplineRepository.findTestsByDisciplineName(name);

	const disciplineWithCategoriesSepareted = {
		name: discipline[0].name,
		category: termService.filterDataByCategory(
			discipline[0].teachersDisciplines[0].test
		),
	};

	return disciplineWithCategoriesSepareted;
}
