import { Router } from "express";
import { getTopTen } from "./lichess.controller.js";

const router = Router();

router.route("/top-ten").get(getTopTen);


export default router;