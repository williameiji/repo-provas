import app from "../src";
import supertest from "supertest";
import prisma from "../src/databases/database";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("Test /signup routes", () => {
	it("returns 201 for valid params", async () => {
		const body = {
			email: "teste@driven.com.br",
			password: "1234",
			refPassword: "1234",
		};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		const user = await prisma.user.findUnique({
			where: { email: body.email },
		});
		expect(status).toEqual(201);
		expect(user).not.toBeNull();
	});

	it("returns 409 if user already exist", async () => {
		const body = {
			email: "teste@driven.com.br",
			password: "1234",
			refPassword: "1234",
		};

		await supertest(app).post("/signup").send(body);
		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		const user = await prisma.user.findUnique({
			where: { email: body.email },
		});
		expect(status).toEqual(409);
		expect(user).not.toBeNull();
	});

	it("returns 422 for incorrect email", async () => {
		const body = {
			email: "testedriven.com.br",
			password: "1234",
			refPassword: "1234",
		};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for incorrect refPassword", async () => {
		const body = {
			email: "teste@driven.com.br",
			password: "1234",
			refPassword: "12345",
		};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for less then 4 characters in password", async () => {
		const body = {
			email: "teste@driven.com.br",
			password: "123",
			refPassword: "123",
		};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty body", async () => {
		const body = {};

		const result = await supertest(app).post("/signup").send(body);
		const status = result.status;

		expect(status).toEqual(422);
	});
});

afterAll(async () => {
	await prisma.$disconnect();
});
