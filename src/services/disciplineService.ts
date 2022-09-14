import * as disciplineRepository from "../repositories/disciplineRepository";

export async function findByName(name: string) {
	const discipline = await disciplineRepository.findByName(name);

	if (!discipline)
		throw { code: "NotFound", message: "Disciplina não encontrada!" };

	return discipline;
}
