import joi from "joi";

const testSchema = joi.object({
	name: joi.string().required(),
	pdfUrl: joi
		.string()
		.pattern(
			/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		)
		.required(),
	category: joi.any().valid("Projeto", "Prática", "Recuperação").required(),
	discipline: joi
		.any()
		.valid(
			"HTML e CSS",
			"JavaScript",
			"React",
			"Humildade",
			"Planejamento",
			"Autoconfiança"
		)
		.required(),
	teacher: joi.any().valid("Diego Pinho", "Bruna Hamori").required(),
});

export default testSchema;
