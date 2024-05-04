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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  var _req$body2, questions, role, result;

  return regeneratorRuntime.async(function evaluate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, questions = _req$body2.questions, role = _req$body2.role;

          if (!(!questions || questions.length === 0)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "No questions provided for evaluation."
          }));

        case 3:
          result = {};
          questions.forEach(function (entry) {
            var progress = entry.progress,
                status = entry.status,
                filteredData = _objectWithoutProperties(entry, ["progress", "status"]);

            filteredData.questions = filteredData.questions.map(function (_ref) {
              var id = _ref.id,
                  solved = _ref.solved,
                  question = _ref.text,
                  rest = _objectWithoutProperties(_ref, ["id", "solved", "text"]);

              return _objectSpread({
                question: question
              }, rest);
            });
            var str = JSON.stringify(filteredData);
            console.log(str); // console.log(str);
            // console.log(result);
            // const prompt = `
            // The candidate selected the role ${role} and answered mutiple questions based on multiple sub domains from this role now I want you to grade the candidate out of 100
            // give me the score only , Base it on the following questions and answers
            // ${results.questions}
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.evaluate = evaluate;