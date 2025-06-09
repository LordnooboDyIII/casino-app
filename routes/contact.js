import { Router } from "express";
import * as contactController from "../controllers/contactController.js";

const router = Router();

//* Getting the contact us page
router.get("/", contactController.getContactPage);

export default router;
