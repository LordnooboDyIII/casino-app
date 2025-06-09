import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

//* Getting the login page
router.get("/login", usersController.getLoginPage);

//* GET Registration Page
router.get("/registration", usersController.getRegistrationPage)

//* POST Registration
router.post("registration", usersController.handleRegistration);

export default router;
