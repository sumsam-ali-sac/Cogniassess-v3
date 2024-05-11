"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = exports.generate = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

var _rankingModel = _interopRequireDefault(require("../models/ranking.model.js"));

var _domainModel = _interopRequireDefault(require("../models/domain.model.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mistralai = _interopRequireDefault(require("@mistralai/mistralai"));

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
  var _req$body2, questions, role, user, all_questions, apiKey, client, Evalprompt, chatResponse, Evaluation, obj, existingRanking, newScore;

  return regeneratorRuntime.async(function evaluate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, questions = _req$body2.questions, role = _req$body2.role, user = _req$body2.user;

          if (!(!questions || questions.length === 0)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "No questions provided for evaluation."
          }));

        case 3:
          all_questions = "";
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
            all_questions = all_questions + str;
          });
          apiKey = "r7IgDHhcj8STs2uRjx3E5nXBOid89wDK";
          client = new _mistralai["default"](apiKey);
          Evalprompt = "\t\n\tCandidate Responses: \n\n\t".concat(all_questions, "\n\t\n\tEvaluate the candidate's responses for a non-technical role based on the selected domains. Assess each answer for relevance, clarity, innovation, and how well they align with the job requirements. If responses appear to be placeholders or are inadequately detailed, this should be reflected in the evaluation. Assign a score out of 100 and provide constructive feedback.\n\n\tTask:\n\n\tPlease ensure fairness in your evaluation Grade based on Alignment with Role Requirements, Innovation and Creativity , Clarity and Articulation , Relevance\n\n\tIf the asnwers are unsatisfactory give straight zero.\n\n\tReturn the results in a JSON object structured as follows:\n\n\t{\n\t\"points\": \"Numerical score\",\n\t\"feedback\": \"Textual feedback summarizing the strengths and weaknesses of the candidate\u2019s answers. If answers are placeholders or inadequate, recommend a resubmission for a \n\t\tmore accurate assessment.\"\n\t}\n\n\tGuidelines:\n\n\tPoints: This key should contain the numerical score reflecting how well the candidate's answers meet the job role and domain expectations.\n\tFeedback: This key should provide feedback detailing strengths and weaknesses in the candidate's answers, including specific recommendations for improvement \n\tor reasons for resubmission.\n\n\tMAKE SURE YOU FOLLOW THE JSON FORMAT GIVEN\n\t");
          _context2.next = 10;
          return regeneratorRuntime.awrap(client.chat({
            model: "mistral-small-latest",
            response_format: {
              type: "json_object"
            },
            messages: [{
              role: "user",
              content: Evalprompt
            }]
          }));

        case 10:
          chatResponse = _context2.sent;
          Evaluation = chatResponse.choices[0].message.content;
          obj = JSON.parse(Evaluation);
          _context2.next = 15;
          return regeneratorRuntime.awrap(_rankingModel["default"].findOne({
            userID: user.id
          }));

        case 15:
          existingRanking = _context2.sent;

          if (!existingRanking) {
            _context2.next = 22;
            break;
          }

          newScore = (existingRanking.rankScore + obj.points) / 2;
          _context2.next = 20;
          return regeneratorRuntime.awrap(_rankingModel["default"].updateOne({
            userID: user.id
          }, {
            rankScore: newScore
          }));

        case 20:
          _context2.next = 24;
          break;

        case 22:
          _context2.next = 24;
          return regeneratorRuntime.awrap(new _rankingModel["default"]({
            userID: user.id,
            rankScore: obj.points
          }).save());

        case 24:
          res.json({
            message: "Answers Evaluated Successfully",
            points: obj.points,
            feedback: obj.feedback
          });
          return _context2.abrupt("return", obj);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.evaluate = evaluate;