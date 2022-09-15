import { Router } from "express";
import authRoute from "./authRoute";
import testRoute from "./testRoute";
import categoryRoute from "./categoryRoute";

const router = Router();

router.use(authRoute);
router.use(testRoute);
router.use(categoryRoute);

export default router;
