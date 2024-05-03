import express from "express";
import { generate } from "../controllers/assessment.controller.js";
const assessmentRouter = express.Router();

assessmentRouter.post("/generate", generate);
// assessmentRouter.post("/evaluate", evaluate);

export default assessmentRouter;
