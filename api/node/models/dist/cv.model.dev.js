"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var cvSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cvContent: {
    type: String,
    "default": null
  },
  cvBlobFileName: {
    type: String,
    "default": null
  }
});

var CV = _mongoose["default"].model("CV", cvSchema);

var _default = CV;
exports["default"] = _default;