"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var questionSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    maxlength: 50
  },
  domain: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Domain"
  },
  targetedRole: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Role"
  }
});

var Question = _mongoose["default"].model("Question", questionSchema);

var _default = Question;
exports["default"] = _default;