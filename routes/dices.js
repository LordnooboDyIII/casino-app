import { Router } from "express";
import * as gamesController from "../controllers/gamesController.js";

const router = Router();

//* GET /games/dices
router.get("/", gamesController.getDiceGamePage);

export default router;
