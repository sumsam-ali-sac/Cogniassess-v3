"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupRoutes = setupRoutes;

var _userRoute = _interopRequireDefault(require("../routes/user.route.js"));

var _authRoute = _interopRequireDefault(require("../routes/auth.route.js"));

var _roleRoute = _interopRequireDefault(require("../routes/role.route.js"));

var _ocrRoute = _interopRequireDefault(require("../routes/ocr.route.js"));

var _cvRoute = _interopRequireDefault(require("../routes/cv.route.js"));

var _domainRoute = _interopRequireDefault(require("../routes/domain.route.js"));

var _assessmentRoute = _interopRequireDefault(require("../routes/assessment.route.js"));

var _rankingRoute = _interopRequireDefault(require("../routes/ranking.route.js"));

var _httpProxyMiddleware = require("http-proxy-middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setupRoutes(app) {
  app.use("/api/node/user", _userRoute["default"]);
  app.use("/api/node/auth", _authRoute["default"]);
  app.use("/api/node/roles", _roleRoute["default"]);
  app.use("/api/node/upload", _ocrRoute["default"]);
  app.use("/api/node/domains", _domainRoute["default"]);
  app.use("/api/node/cv", _cvRoute["default"]);
  app.use("/api/node/assessment", _assessmentRoute["default"]);
  app.use("/api/node/ranking", _rankingRoute["default"]);
  app.use("/api/fastapi", (0, _httpProxyMiddleware.createProxyMiddleware)({
    target: "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: {
      "^/api/fastapi": ""
    }
  }));
}