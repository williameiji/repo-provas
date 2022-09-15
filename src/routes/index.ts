import { Router } from "express";
import authRoute from "./authRoute";
import testRoute from "./testRoute";
import categoryRoute from "./categoryRoute";
import disciplineRoute from "./disciplineRoute";
import teacherRoute from "./teacherRoute";

const router = Router();

router.use(authRoute);
router.use(testRoute);
router.use(categoryRoute);
router.use(disciplineRoute);
router.use(teacherRoute);

export default router;
