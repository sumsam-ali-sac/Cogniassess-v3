import express from "express";
import { leaderboard } from "../controllers/ranking.controller.js";
const rankingRouter = express.Router();

rankingRouter.get("/leaderboard", leaderboard);

export default rankingRouter;
