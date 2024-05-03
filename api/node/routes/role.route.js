import express from "express";
import { getAllRoles, createRole } from "../controllers/role.controller.js";

const roleRouter = express.Router();

roleRouter.get("/", getAllRoles);
roleRouter.post("/", createRole);

export default roleRouter;
