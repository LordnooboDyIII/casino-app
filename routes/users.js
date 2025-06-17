import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

// GET Registration Page
router.get("/registration", usersController.getRegistrationPage);

// POST Registration
router.post("/registration", usersController.handleRegistration);

// GET Login Page
router.get("/login", usersController.getLoginPage);

// POST Login
router.post("/login", usersController.handleLogin);

export default router;
