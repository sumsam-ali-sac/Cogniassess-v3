"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupWebSocket = setupWebSocket;

var _ws = require("ws");

var _mistralai = _interopRequireDefault(require("@mistralai/mistralai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

function setupWebSocket(server) {
  var wss = new _ws.WebSocketServer({
    server: server
  });
  var apiKey = process.env.MISTRAL_API_KEY;
  var client = new _mistralai["default"](apiKey);
  console.log("client ws 1");
  wss.on("connection", function (socket) {
    console.log("client ws 2");
    console.log("New WebSocket connection established");
    socket.on("message", function _callee(message) {
      var messageString, chatStreamResponse, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, streamText;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              messageString = message.toString("utf-8");
              console.log("Received message:", messageString);
              _context.next = 5;
              return regeneratorRuntime.awrap(client.chatStream({
                model: "mistral-tiny",
                messages: [{
                  role: "user",
                  content: messageString
                }]
              }));

            case 5:
              chatStreamResponse = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 8;
              _iterator = _asyncIterator(chatStreamResponse);

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
                _context.next = 23;
                break;
              }

              chunk = _value;

              if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content !== undefined) {
                streamText = chunk.choices[0].delta.content;
                socket.send(streamText);
              }

            case 20:
              _iteratorNormalCompletion = true;
              _context.next = 10;
              break;

            case 23:
              _context.next = 29;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 29:
              _context.prev = 29;
              _context.prev = 30;

              if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                _context.next = 34;
                break;
              }

              _context.next = 34;
              return regeneratorRuntime.awrap(_iterator["return"]());

            case 34:
              _context.prev = 34;

              if (!_didIteratorError) {
                _context.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return _context.finish(34);

            case 38:
              return _context.finish(29);

            case 39:
              _context.next = 45;
              break;

            case 41:
              _context.prev = 41;
              _context.t1 = _context["catch"](0);
              console.error("Error during chat stream:", _context.t1);
              socket.send("Error: " + _context.t1.message);

            case 45:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 41], [8, 25, 29, 39], [30,, 34, 38]]);
    });
    socket.on("close", function () {
      console.log("WebSocket connection closed");
    });
    socket.on("error", function (error) {
      console.error("WebSocket error:", error);
    });
  });
}