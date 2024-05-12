"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _rankingController = require("../controllers/ranking.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rankingRouter = _express["default"].Router();

rankingRouter.get("/leaderboard", _rankingController.leaderboard);
var _default = rankingRouter;
exports["default"] = _default;