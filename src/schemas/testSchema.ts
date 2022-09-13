import joi from "joi";

const testSchema = joi.object({
	name: joi.string().required(),
	pdfUrl: joi
		.string()
		.pattern(
			/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		)
		.required(),
	category: joi.string().required(),
	discipline: joi.string().required(),
	teacher: joi.string().required(),
});

export default testSchema;
