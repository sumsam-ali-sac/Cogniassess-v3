"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = exports.generate = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

var _roleModel = _interopRequireDefault(require("../models/role.model.js"));

var _domainModel = _interopRequireDefault(require("../models/domain.model.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generate = function generate(req, res) {
  var _req$body, selectedDomain, selectedRole, userId, fastApiUrl, userCV, cvContent, response;

  return regeneratorRuntime.async(function generate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, selectedDomain = _req$body.selectedDomain, selectedRole = _req$body.selectedRole;
          userId = req.body.userId || req.header("X-User-ID");
          console.log(userId);
          selectedRole = String(selectedRole);
          selectedDomain = String(selectedDomain["name"]);
          fastApiUrl = "http://localhost:8000/generate-questions";
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(_cvModel["default"].findOne({
            userID: userId
          }));

        case 9:
          userCV = _context.sent;

          if (userCV) {
            _context.next = 12;
            break;
          }

          throw new Error("CV not found for the user");

        case 12:
          cvContent = userCV.cvContent;
          _context.next = 15;
          return regeneratorRuntime.awrap(_axios["default"].post(fastApiUrl, {
            selectedDomain: selectedDomain,
            selectedRole: selectedRole,
            cvContent: cvContent
          }));

        case 15:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 21;
            break;
          }

          console.log(response.data);
          res.json(response.data);
          _context.next = 22;
          break;

        case 21:
          throw new Error("Failed to generate questions from the FastAPI backend");

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](6);
          console.error("Error in generating questions: ".concat(_context.t0));
          res.status(500).json({
            error: "Failed to generate questions: ".concat(_context.t0.message)
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 24]]);
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