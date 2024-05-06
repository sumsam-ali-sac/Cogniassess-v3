"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _dotenv = require("dotenv");

var _middleware = require("./config/middleware.js");

var _connectDB = require("./lib/connectDB.js");

var _routes = require("./config/routes.js");

var _errorHandler = require("./middleware/errorHandler.js");

var _websocket = require("./lib/websocket.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configure environment variables
(0, _dotenv.config)(); // Initialize database connection

(0, _connectDB.connectDB)(); // Create an Express application

var app = (0, _express["default"])(); // Setup middleware configurations

(0, _middleware.setupMiddlewares)(app); // Define application routes

(0, _routes.setupRoutes)(app); // Use custom error handler

app.use(_errorHandler.errorHandler);
var server = (0, _http.createServer)(app);
(0, _websocket.setupWebSocket)(server); // Define the port for the server to listen on

var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log("Server is listening on http://localhost:".concat(PORT));
});