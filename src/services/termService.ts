import * as termRepository from "../repositories/termRepository";

export async function sendTestsByDiscipline() {
	const data = await termRepository.findTestsByDiscipline();

	return data;
}
