"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var domainSchema = new Schema({
  DomainName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  iconPath: {
    type: String,
    required: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: "Role"
  }]
});

var Domain = _mongoose["default"].model("Domain", domainSchema);

var _default = Domain;
exports["default"] = _default;