import prisma from "../src/databases/database";
import createTerms from "./factories/termsFactory";
import createCategory from "./factories/categoryFactory";
import createTeacher from "./factories/teacherFactory";

async function main() {
	const terms = [1, 2, 3, 4, 5, 6];
	const categories = ["Projeto", "Prática", "Recuperação"];
	const teachers = ["Diego Pinho", "Bruna Hamori"];
	const disciplines = [
		{ name: "HTML e CSS", termId: 1 },
		{ name: "JavaScript", termId: 2 },
		{ name: "React", termId: 3 },
		{ name: "Humildade", termId: 4 },
		{ name: "Planejamento", termId: 5 },
		{ name: "Autoconfiança", termId: 6 },
	];
	const teacherDiscipline = [
		{ id: 1, teacherId: 1, disciplineId: 1 },
		{ id: 2, teacherId: 1, disciplineId: 2 },
		{ id: 3, teacherId: 1, disciplineId: 3 },
		{ id: 4, teacherId: 2, disciplineId: 4 },
		{ id: 5, teacherId: 2, disciplineId: 5 },
		{ id: 7, teacherId: 2, disciplineId: 6 },
	];

	for await (const term of terms) {
		const newTerm = await createTerms(term);
		await prisma.term.upsert({
			where: newTerm,
			update: {},
			create: newTerm,
		});
	}

	for await (const category of categories) {
		const newCategory = await createCategory(category);
		await prisma.category.upsert({
			where: newCategory,
			update: {},
			create: newCategory,
		});
	}

	for await (const teacher of teachers) {
		const newTeacher = await createTeacher(teacher);
		await prisma.teacher.upsert({
			where: newTeacher,
			update: {},
			create: newTeacher,
		});
	}

	for await (const discipline of disciplines) {
		await prisma.discipline.upsert({
			where: { name: discipline.name },
			update: {},
			create: discipline,
		});
	}

	for await (const td of teacherDiscipline) {
		await prisma.teachersDisciplines.upsert({
			where: { id: td.id },
			update: {},
			create: td,
		});
	}
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
