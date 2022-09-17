export interface Categories {
	id: number;
	name: string;
	pdfUrl: string;
	createdAt: Date;
	category: { name: string };
	teacherDiscipline: { discipline: { name: string } };
}
