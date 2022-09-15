import { Router } from "express";
import authRoute from "./authRoute";
import testRoute from "./testRoute";
import categoryRoute from "./categoryRoute";
import disciplineRoute from "./disciplineRoute";

const router = Router();

router.use(authRoute);
router.use(testRoute);
router.use(categoryRoute);
router.use(disciplineRoute);

export default router;
