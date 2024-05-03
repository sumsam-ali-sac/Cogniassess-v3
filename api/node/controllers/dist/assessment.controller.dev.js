"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = exports.generate = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

var _roleModel = _interopRequireDefault(require("../models/role.model.js"));

var _domainModel = _interopRequireDefault(require("../models/domain.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generate = function generate(req, res) {
  var _req$body, selectedDomain, selectedRole, fastApiUrl, response;

  return regeneratorRuntime.async(function generate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, selectedDomain = _req$body.selectedDomain, selectedRole = _req$body.selectedRole;
          selectedRole = String(selectedRole);
          selectedDomain = String(selectedDomain["name"]);
          fastApiUrl = "http://localhost:8000/generate-questions";
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].post(fastApiUrl, {
            selectedDomain: selectedDomain,
            selectedRole: selectedRole
          }));

        case 7:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 13;
            break;
          }

          console.log(response.data);
          res.json(response.data);
          _context.next = 14;
          break;

        case 13:
          throw new Error("Failed to generate questions from the FastAPI backend");

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          console.error("Error in generating questions: ".concat(_context.t0));
          res.status(500).json({
            error: "Failed to generate questions: ".concat(_context.t0.message)
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 16]]);
};

exports.generate = generate;

var evaluate = function evaluate(req, res) {
  return regeneratorRuntime.async(function evaluate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.evaluate = evaluate;