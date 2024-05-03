import express from "express";
const domainRouter = express.Router();
import { insertMultipleDomains } from "../controllers/domain.controller.js";
import { searchDomains } from "../controllers/domain.controller.js";
domainRouter.post("/insert-many", insertMultipleDomains);
domainRouter.get("/search", searchDomains);

export default domainRouter;
