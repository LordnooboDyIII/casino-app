import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

// GET Registration Page
router.get("/", usersController.getRegistrationPage);

// POST Registration
router.post("/", usersController.handleRegistration);

export default router;
