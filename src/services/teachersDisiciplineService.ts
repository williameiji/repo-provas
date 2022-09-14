import * as teachersDisciplinesRepository from "../repositories/teachersDisciplineRepository";

export async function findByNames(discipline: string, teacher: string) {
	const teacherDiscipline = await teachersDisciplinesRepository.findByNames(
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
