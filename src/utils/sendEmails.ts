import sgMail from "@sendgrid/mail";
import * as authService from "../services/authService";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const CreateMessage = async (
	to: string,
	data: {
		name: string;
		pdfUrl: string;
		category: string;
		discipline: string;
		teacher: string;
	}
) => ({
	to,
	from: "william.fujimori@gmail.com",
	subject: "Nova prova adicionada!",
	text: "repo-provas",
	html: `<strong> A seguinte prova foi adicionadas: ${data.teacher} ${
		data.category
	} ${new Date().getFullYear()} - ${data.name} (${data.category}) </strong>`,
});

export async function sendEmails(data: {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}) {
	const users = await authService.getAllUsers();

	for await (const user of users) {
		try {
			const message = await CreateMessage(user.email, data);

			await sgMail.send(message);
		} catch (error) {
			console.error(error);

			if (error.response) {
				console.error(error.response.body);
			}
		}
	}
}
