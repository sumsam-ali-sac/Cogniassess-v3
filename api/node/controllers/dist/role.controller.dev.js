"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRole = exports.getAllRoles = void 0;

var _roleModel = _interopRequireDefault(require("../models/role.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllRoles = function getAllRoles(req, res) {
  var roles;
  return regeneratorRuntime.async(function getAllRoles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_roleModel["default"].find());

        case 3:
          roles = _context.sent;
          res.json(roles);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllRoles = getAllRoles;

var createRole = function createRole(req, res) {
  var role, savedRole;
  return regeneratorRuntime.async(function createRole$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          role = new _roleModel["default"](req.body);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(role.save());

        case 4:
          savedRole = _context2.sent;
          res.status(201).json(savedRole);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(400).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.createRole = createRole;