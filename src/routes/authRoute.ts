import { Router } from "express";
import { validateSchema } from "../middlewares/schemasValidator";
import signupSchema from "../schemas/signupSchema";
import loginSchema from "../schemas/loginSchema";
import * as authController from "../controllers/authController";

const authRoute = Router();

authRoute.post("/signup", validateSchema(signupSchema), authController.signup);

authRoute.post("/login", validateSchema(loginSchema), authController.login);

authRoute.post("/auth", authController.loginGit);

export default authRoute;
