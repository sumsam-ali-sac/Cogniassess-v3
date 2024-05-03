"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/auth.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRouter = _express["default"].Router();

authRouter.post("/signup", _authController.signup);
authRouter.post("/signin", _authController.signin);
authRouter.post("/google", _authController.google);
var _default = authRouter;
exports["default"] = _default;