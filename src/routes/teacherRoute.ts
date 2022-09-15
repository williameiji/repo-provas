import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import * as teacherController from "../controllers/teacherController";

const teacherRoute = Router();

teacherRoute.get(
	"/teachers/:id",
	verifyToken,
	teacherController.sendTeacherByDiscipline
);

export default teacherRoute;
