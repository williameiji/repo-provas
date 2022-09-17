export interface Discipline {
	id: number;
	name: string;
	pdfUrl: string;
	createdAt: Date;
	category: { name: string };
	teacherDiscipline: { teacher: { name: string } };
}
