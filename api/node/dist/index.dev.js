"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _httpProxyMiddleware = require("http-proxy-middleware");

var _userRoute = _interopRequireDefault(require("./routes/user.route.js"));

var _authRoute = _interopRequireDefault(require("./routes/auth.route.js"));

var _roleRoute = _interopRequireDefault(require("./routes/role.route.js"));

var _ocrRoute = _interopRequireDefault(require("./routes/ocr.route.js"));

var _cvRoute = _interopRequireDefault(require("./routes/cv.route.js"));

var _domainRoute = _interopRequireDefault(require("./routes/domain.route.js"));

var _assessmentRoute = _interopRequireDefault(require("./routes/assessment.route.js"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGO));

        case 3:
          console.log("MongoDB connected successfully");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("MongoDB connection error:", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

connectDB();

_mongoose["default"].connection.on("connected", function () {
  console.log("Mongoose connected to DB");
});

_mongoose["default"].connection.on("error", function (err) {
  console.error("Mongoose connection error:", err);
});

_mongoose["default"].connection.on("disconnected", function () {
  console.log("Mongoose disconnected from DB");
});

process.on("SIGINT", function () {
  _mongoose["default"].connection.close(function () {
    console.log("Mongoose connection disconnected due to app termination");
    process.exit(0);
  });
});
var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"]["static"]("public"));
app.use("/api/fastapi", (0, _httpProxyMiddleware.createProxyMiddleware)({
  target: "http://localhost:8000",
  changeOrigin: true,
  pathRewrite: {
    "^/api/fastapi": ""
  }
}));
app.use("/api/node/user", _userRoute["default"]);
app.use("/api/node/auth", _authRoute["default"]);
app.use("/api/node/roles", _roleRoute["default"]);
app.use("/api/node/upload", _ocrRoute["default"]);
app.use("/api/node/domains", _domainRoute["default"]);
app.use("/api/node/cv", _cvRoute["default"]);
app.use("/api/node/assessment", _assessmentRoute["default"]);
app.use(function (err, req, res, next) {
  var statusCode = err.statusCode || 500;
  console.log(err);

  if (err.name === "ValidationError") {
    var errors = Object.values(err.errors).map(function (el) {
      return el.message;
    });
    var fields = Object.values(err.errors).map(function (el) {
      return el.path;
    });

    var _message = "".concat(errors.join(" and "), " Please ensure unique values for: ").concat(fields.join(", "), ".");

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: _message
    });
  }

  var message = err.message || "An unexpected error occurred.";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});
app.listen(3000, function () {
  console.log("listening on 3000 ");
});