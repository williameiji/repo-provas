import app from "../src";
import supertest from "supertest";
import prisma from "../src/databases/database";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE tests;`;
	await prisma.$executeRaw`TRUNCATE TABLE users;`;

	const bodySignup = {
		email: "teste@driven.com.br",
		password: "1234",
		refPassword: "1234",
	};

	await supertest(app).post("/signup").send(bodySignup);
});

async function login() {
	const body = {
		email: "teste@driven.com.br",
		password: "1234",
	};

	const result = await supertest(app).post("/login").send(body);

	return result.text;
}

describe("Test /tests routes", () => {
	it("returns 201 for valid params", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(201);
	});

	it("returns 422 for empty name", async () => {
		const body = {
			name: "",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty pdfUrl", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty category", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty discipline", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for empty teacher", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 422 for wrong type of url", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(422);
	});

	it("returns 404 for discipline that doesn't exist", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Test",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(404);
	});

	it("returns 404 for teacher that doesn't exist", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Test",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(404);
	});

	it("returns 404 for category that doesn't exist", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Test",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(404);
	});

	it("returns 401 for invalid token", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer TEST${token}`, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(401);
	});

	it("returns 401 for missing token", async () => {
		const body = {
			name: "Test 1",
			pdfUrl: "https://shortly-back.herokuapp.com/urls/open/M1HmIT",
			category: "Prática",
			discipline: "Humildade",
			teacher: "Bruna Hamori",
		};

		const token = await login();

		const result = await supertest(app)
			.post("/tests")
			.set({ authorization: `Bearer `, Accept: "application/json" })
			.send(body);

		const status = result.status;

		expect(status).toEqual(401);
	});
});

describe("Test /tests/disciplines routes", () => {
	it("returns 200 and Array for valid params", async () => {
		const token = await login();

		const result = await supertest(app)
			.get("/tests/disciplines")
			.set({ authorization: `Bearer ${token}`, Accept: "application/json" })
			.send();

		const status = result.status;
		const body = result.body;

		expect(status).toEqual(200);
		expect(body).toBeInstanceOf(Array);
	});

	it("returns 401 for invalid token", async () => {
		const token = await login();

		const result = await supertest(app)
			.get("/tests/disciplines")
			.set({ authorization: `Bearer TEST${token}`, Accept: "application/json" })
			.send();

		const status = result.status;

		expect(status).toEqual(401);
	});

	it("returns 401 for missing token", async () => {
		const token = await login();

		const result = await supertest(app)
			.get("/tests/disciplines")
			.set({ authorization: `Bearer `, Accept: "application/json" })
			.send();

		const status = result.status;

		expect(status).toEqual(401);
	});
});

afterAll(async () => {
	await prisma.$disconnect();
});
