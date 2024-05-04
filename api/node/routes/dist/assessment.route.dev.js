"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _assessmentController = require("../controllers/assessment.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var assessmentRouter = _express["default"].Router();

assessmentRouter.post("/generate", _assessmentController.generate);
assessmentRouter.post("/evaluate", _assessmentController.evaluate);
var _default = assessmentRouter;
exports["default"] = _default;