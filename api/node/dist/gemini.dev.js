"use strict";

var _generativeAi = require("@google/generative-ai");

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var MODEL_NAME = "gemini-1.0-pro";
var API_KEY = "AIzaSyAfChM6LNmdf7vY6c94C5ZjcnywMVjqYYE";

function run() {
  var model, prompt, result, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, chunkText;

  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          model = genAI.getGenerativeModel({
            model: "gemini-1.0-pro"
          });
          prompt = "Write a story about a magic backpack.";
          _context.next = 4;
          return regeneratorRuntime.awrap(model.generateContentStream(prompt));

        case 4:
          result = _context.sent;
          text = "";
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _context.prev = 8;
          _iterator = _asyncIterator(result.stream);

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(_iterator.next());

        case 12:
          _step = _context.sent;
          _iteratorNormalCompletion = _step.done;
          _context.next = 16;
          return regeneratorRuntime.awrap(_step.value);

        case 16:
          _value = _context.sent;

          if (_iteratorNormalCompletion) {
            _context.next = 25;
            break;
          }

          chunk = _value;
          chunkText = chunk.text();
          console.log(chunkText);
          text += chunkText;

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
            _context.next = 36;
            break;
          }

          _context.next = 36;
          return regeneratorRuntime.awrap(_iterator["return"]());

        case 36:
          _context.prev = 36;

          if (!_didIteratorError) {
            _context.next = 39;
            break;
          }

          throw _iteratorError;

        case 39:
          return _context.finish(36);

        case 40:
          return _context.finish(31);

        case 41:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 27, 31, 41], [32,, 36, 40]]);
}

function runChat(USER_INPUT) {
  var genAI, model, generationConfig, safetySettings, chat, result, text, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value2, chunk, chunkText;

  return regeneratorRuntime.async(function runChat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          genAI = new _generativeAi.GoogleGenerativeAI(API_KEY);
          model = genAI.getGenerativeModel({
            model: MODEL_NAME
          });
          generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048
          };
          safetySettings = [{
            category: _generativeAi.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: _generativeAi.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          }, {
            category: _generativeAi.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: _generativeAi.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          }, {
            category: _generativeAi.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: _generativeAi.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          }, {
            category: _generativeAi.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: _generativeAi.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
          }];
          chat = model.startChat({
            generationConfig: generationConfig,
            safetySettings: safetySettings,
            history: []
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(chat.sendMessageStream(USER_INPUT));

        case 7:
          result = _context2.sent;
          text = "";
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _context2.prev = 11;
          _iterator2 = _asyncIterator(result.stream);

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(_iterator2.next());

        case 15:
          _step2 = _context2.sent;
          _iteratorNormalCompletion2 = _step2.done;
          _context2.next = 19;
          return regeneratorRuntime.awrap(_step2.value);

        case 19:
          _value2 = _context2.sent;

          if (_iteratorNormalCompletion2) {
            _context2.next = 28;
            break;
          }

          chunk = _value2;
          chunkText = chunk.text();
          console.log(chunkText);
          text += chunkText;

        case 25:
          _iteratorNormalCompletion2 = true;
          _context2.next = 13;
          break;

        case 28:
          _context2.next = 34;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](11);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 34:
          _context2.prev = 34;
          _context2.prev = 35;

          if (!(!_iteratorNormalCompletion2 && _iterator2["return"] != null)) {
            _context2.next = 39;
            break;
          }

          _context2.next = 39;
          return regeneratorRuntime.awrap(_iterator2["return"]());

        case 39:
          _context2.prev = 39;

          if (!_didIteratorError2) {
            _context2.next = 42;
            break;
          }

          throw _iteratorError2;

        case 42:
          return _context2.finish(39);

        case 43:
          return _context2.finish(34);

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 30, 34, 44], [35,, 39, 43]]);
}

runChat("hello");