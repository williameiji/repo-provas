import app from "../src";
import supertest from "supertest";
import prisma from "../src/databases/database";
import signupFactory from "./factories/signupFactory";
import loginFactory from "./factories/loginFactory";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users;`;

	const bodySignup = await signupFactory();

	await supertest(app).post("/signup").send(bodySignup);
});

describe("Test /login routes", () => {
	it("returns 200 and token for valid params", async () => {
		const body = await loginFactory();

		const result = await supertest(app).post("/login").send(body);
		const status = result.status;
		const token = result.text;

		expect(status).toEqual(200);
		expect(typeof token).toBe("string");
	});

	it("returns 404 if user doesn't exist", async () => {
		const body = await loginFactory();

		const result = await supertest(app)
			.post("/login")
			.send({ ...body, email: "teste10@driven.com.br" });
		const status = result.status;

		expect(status).toEqual(404);
	});

	it("returns 422 for incorrect email", async () => {
		const body = await loginFactory();

		const result = await supertest(app)
			.post("/login")
			.send({ ...body, email: "testedriven.com.br" });
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 401 for incorrect password", async () => {
		const body = await loginFactory();

		const result = await supertest(app)
			.post("/login")
			.send({ ...body, password: "4321" });
		const status = result.status;

		expect(status).toEqual(401);
	});

	it("returns 422 for less then 4 characters in password", async () => {
		const body = await loginFactory();

		const result = await supertest(app)
			.post("/login")
			.send({ ...body, password: "123" });
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty body", async () => {
		const body = {};

		const result = await supertest(app).post("/login").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});
});

afterAll(async () => {
	await prisma.$disconnect();
});
