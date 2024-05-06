import express from "express";
import { createServer } from "http";
import { config as dotenvConfig } from "dotenv";
import { setupMiddlewares } from "./config/middleware.js";
import { connectDB } from "./lib/connectDB.js";
import { setupRoutes } from "./config/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { setupWebSocket } from "./lib/websocket.js";

// Configure environment variables
dotenvConfig();

// Initialize database connection
connectDB();

// Create an Express application
const app = express();

// Setup middleware configurations
setupMiddlewares(app);

// Define application routes
setupRoutes(app);

// Use custom error handler
app.use(errorHandler);

const server = createServer(app);

setupWebSocket(server);

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
