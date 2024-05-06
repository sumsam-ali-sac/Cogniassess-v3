import cors from "cors";
import helmet from "helmet";
import express from "express";

export function setupMiddlewares(app) {
	app.use(helmet());
	app.use(cors());
	app.use(express.json());
	app.use(express.static("public"));
}
