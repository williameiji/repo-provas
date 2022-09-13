import * as termRepository from "../repositories/termRepository.js";

export async function sendTestsByDiscipline() {
	const data = await termRepository.findTestsByDiscipline();

	return data;
}
