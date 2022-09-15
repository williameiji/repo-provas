import * as categoryRepository from "../repositories/categoryRepository";

export async function findByName(name: string) {
	const category = await categoryRepository.findByName(name);

	if (!category)
		throw { code: "NotFound", message: "Categoria não encontrada!" };

	return category;
}

export async function sendCategories() {
	const categories = await categoryRepository.getAllCategories();

	return categories;
}
