import { Router } from "express";
import * as profileController from "../controllers/profileController.js";

const router = Router();

//* Getting the profile page
router.get("/", profileController.getProfilePage);

export default router;