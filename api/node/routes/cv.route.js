import express from "express";
import { checkIfCvContentExists } from "../controllers/cv.controller.js";
const cvRouter = express.Router();

cvRouter.get("/check:userId", checkIfCvContentExists);

export default cvRouter;
