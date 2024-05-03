import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import roleRouter from "./routes/role.route.js";
import ocrRouter from "./routes/ocr.route.js";
import cvRouter from "./routes/cv.route.js";
import domainRouter from "./routes/domain.route.js";
import assessmentRouter from "./routes/assessment.route.js";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
}

connectDB();

mongoose.connection.on("connected", () => {
	console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
	console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected from DB");
});

process.on("SIGINT", () => {
	mongoose.connection.close(() => {
		console.log("Mongoose connection disconnected due to app termination");
		process.exit(0);
	});
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(
	"/api/fastapi",
	createProxyMiddleware({
		target: "http://localhost:8000",
		changeOrigin: true,
		pathRewrite: {
			"^/api/fastapi": "",
		},
	})
);

app.use("/api/node/user", userRouter);
app.use("/api/node/auth", authRouter);
app.use("/api/node/roles", roleRouter);
app.use("/api/node/upload", ocrRouter);
app.use("/api/node/domains", domainRouter);
app.use("/api/node/cv", cvRouter);
app.use("/api/node/assessment", assessmentRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.log(err);
	if (err.name === "ValidationError") {
		const errors = Object.values(err.errors).map((el) => el.message);
		const fields = Object.values(err.errors).map((el) => el.path);
		const message = `${errors.join(
			" and "
		)} Please ensure unique values for: ${fields.join(", ")}.`;

		return res.status(400).json({
			success: false,
			statusCode: 400,
			message,
		});
	}

	const message = err.message || "An unexpected error occurred.";
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

app.listen(3000, () => {
	console.log("listening on 3000 ");
});
