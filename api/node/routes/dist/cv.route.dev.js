"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cvController = require("../controllers/cv.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cvRouter = _express["default"].Router();

cvRouter.get("/check:userId", _cvController.checkIfCvContentExists);
cvRouter.post("/analysis", _cvController.analyzeCV);
var _default = cvRouter;
exports["default"] = _default;