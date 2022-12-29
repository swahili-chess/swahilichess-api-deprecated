import { Router } from "express";
import { getTopFiveBlitz, getTopFiveRapid } from "./lichess.controller.js";

const router = Router();

router.route("/rapid/top-5").get(getTopFiveRapid);
router.route("/blitz/top-5").get(getTopFiveBlitz);

export default router;