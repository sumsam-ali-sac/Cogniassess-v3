"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyzeCV = exports.checkIfCvContentExists = void 0;

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

var _axios = _interopRequireDefault(require("axios"));

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

var analyzeCV = function analyzeCV(req, res) {
  var _req$body, extractedText, userId, fastApiUrl, response, data;

  return regeneratorRuntime.async(function analyzeCV$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, extractedText = _req$body.extractedText, userId = _req$body.userId;
          console.log(extractedText, userId);
          fastApiUrl = "http://localhost:8000/analysis";
          _context2.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].post(fastApiUrl, {
            userId: userId,
            extractedText: extractedText
          }));

        case 6:
          response = _context2.sent;
          data = response.data;
          res.json({
            message: "File analyzed successfully!",
            analysis: data.analysis,
            summary: data.summary
          });
          return _context2.abrupt("return", data);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Server error",
            error: _context2.t0
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.analyzeCV = analyzeCV;