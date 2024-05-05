import express from "express";
import {
	checkIfCvContentExists,
	analyzeCV,
} from "../controllers/cv.controller.js";
const cvRouter = express.Router();

cvRouter.get("/check:userId", checkIfCvContentExists);
cvRouter.post("/analysis", analyzeCV);

export default cvRouter;
