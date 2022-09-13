import { Router } from "express";
import { validateSchema } from "../middlewares/schemasValidator.js";
import signupSchema from "../schemas/signupSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import * as authController from "../controllers/authController.js";

const authRoute = Router();

authRoute.post("/signup", validateSchema(signupSchema), authController.signup);

authRoute.post("/login", validateSchema(loginSchema), authController.login);

export default authRoute;
