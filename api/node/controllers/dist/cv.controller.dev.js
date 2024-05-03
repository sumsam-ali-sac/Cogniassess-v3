"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfCvContentExists = void 0;

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkIfCvContentExists = function checkIfCvContentExists(req, res) {
  var userId, cv;
  return regeneratorRuntime.async(function checkIfCvContentExists$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.params.userId;
          _context.next = 4;
          return regeneratorRuntime.awrap(_cvModel["default"].findOne({
            userID: userId
          }).exec());

        case 4:
          cv = _context.sent;

          if (cv) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "No CV found for this user."
          }));

        case 7:
          res.json(cv);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Server error",
            error: _context.t0
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.checkIfCvContentExists = checkIfCvContentExists;