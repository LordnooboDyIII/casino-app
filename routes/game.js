import { Router } from "express";
import * as coinflipController from "../controllers/coinflipController.js";

const router = Router();

//* GET Coinflip Page
router.get("/coinflip", coinflipController.getCoinflipPage);

export default router;
