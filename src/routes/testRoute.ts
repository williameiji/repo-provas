import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import { validateSchema } from "../middlewares/schemasValidator";
import testSchema from "../schemas/testSchema";
import * as testController from "../controllers/testController";

const testRoute = Router();

testRoute.use(verifyToken);
testRoute.post("/tests", validateSchema(testSchema), testController.newTest);
testRoute.get("/tests/disciplines", testController.sendTestsByDiscipline);
testRoute.get("/tests/teachers", testController.sendTestsByTeachers);

export default testRoute;
