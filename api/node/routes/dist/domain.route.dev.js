"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _domainController = require("../controllers/domain.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var domainRouter = _express["default"].Router();

domainRouter.post("/insert-many", _domainController.insertMultipleDomains);
domainRouter.get("/search", _domainController.searchDomains);
var _default = domainRouter;
exports["default"] = _default;