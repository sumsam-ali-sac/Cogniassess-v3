import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";
import roleRouter from "../routes/role.route.js";
import ocrRouter from "../routes/ocr.route.js";
import cvRouter from "../routes/cv.route.js";
import domainRouter from "../routes/domain.route.js";
import assessmentRouter from "../routes/assessment.route.js";
import { createProxyMiddleware } from "http-proxy-middleware";

export function setupRoutes(app) {
	app.use("/api/node/user", userRouter);
	app.use("/api/node/auth", authRouter);
	app.use("/api/node/roles", roleRouter);
	app.use("/api/node/upload", ocrRouter);
	app.use("/api/node/domains", domainRouter);
	app.use("/api/node/cv", cvRouter);
	app.use("/api/node/assessment", assessmentRouter);

	app.use(
		"/api/fastapi",
		createProxyMiddleware({
			target: "http://localhost:8000",
			changeOrigin: true,
			pathRewrite: { "^/api/fastapi": "" },
		})
	);
}
