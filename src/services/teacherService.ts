import * as teacherRepository from "../repositories/disciplineRepository.js";

export async function findByName(name: string) {
	const teacher = await teacherRepository.findByName(name);

	if (!teacher)
		throw { code: "NotFound", message: "Disciplina não encontrada!" };

	return teacher;
}
