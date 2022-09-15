import { Router } from "express";
import * as disciplineController from "../controllers/disciplineController";
import verifyToken from "../middlewares/verifyToken";

const disciplineRoute = Router();

disciplineRoute.get(
	"/disciplines",
	verifyToken,
	disciplineController.sendAllDisciplines
);

export default disciplineRoute;
