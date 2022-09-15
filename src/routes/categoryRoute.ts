import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import * as categoryCrontroller from "../controllers/categoryController";

const categoryRoute = Router();

categoryRoute.get(
	"/categories",
	verifyToken,
	categoryCrontroller.sendCategories
);

export default categoryRoute;
