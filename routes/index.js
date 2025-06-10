import { Router } from "express";
import * as indexController from "../controllers/indexController.js";

const router = Router();

//* GET Welcome Page
router.get("/", indexController.getWelcomePage);

//* GET Home Page
router.get("/home", indexController.getHomePage)

export default router;
