import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import testSchema from "../schemas/testSchema.js";
import * as testController from "../controllers/testController.js";

const testRoute = Router();

testRoute.use(verifyToken);
testRoute.post("/tests", validateSchema(testSchema), testController.newTest);
testRoute.get("/tests/disciplines", testController.sendTestsByDiscipline);
testRoute.get("/tests/teachers", testController.sendTestsByTeachers);

export default testRoute;
