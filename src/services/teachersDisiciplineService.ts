import * as teachersDisciplinesRepository from "../repositories/teachersDisciplineRepository.js";

export async function findByName(discipline: string, teacher: string) {
	const teacherDiscipline = await teachersDisciplinesRepository.findByName(
		discipline,
		teacher
	);

	if (!teacherDiscipline)
		throw {
			code: "NotFound",
			message: "Professor/Disciplina não tem relação!",
		};

	return teacherDiscipline;
}
