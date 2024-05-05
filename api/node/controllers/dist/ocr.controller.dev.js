"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processUpload = void 0;

var _aiFormRecognizer = require("@azure/ai-form-recognizer");

var _dotenv = _interopRequireDefault(require("dotenv"));

var fs = _interopRequireWildcard(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

var _cvModel = _interopRequireDefault(require("../models/cv.model.js"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var processUpload = function processUpload(req, res) {
  var userId, key, endpoint, client, file, poller, result, extractedText, timestamp, extension, newFileName, newFilePath, fastApiUrl, response, data;
  return regeneratorRuntime.async(function processUpload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(400).send("No file uploaded."));

        case 2:
          userId = req.body.userId || req.header("X-User-ID");
          console.log(userId);

          if (userId) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send("User ID is required."));

        case 6:
          _context.prev = 6;
          key = process.env.AZURE_OCR_KEY;
          endpoint = process.env.AZURE_OCR_ENDPOINT;
          client = new _aiFormRecognizer.DocumentAnalysisClient(endpoint, new _aiFormRecognizer.AzureKeyCredential(key));
          console.log(req.file.path);
          file = fs.createReadStream(req.file.path);
          _context.next = 14;
          return regeneratorRuntime.awrap(client.beginAnalyzeDocument("prebuilt-layout", file));

        case 14:
          poller = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(poller.pollUntilDone());

        case 17:
          result = _context.sent;
          extractedText = result.pages.map(function (page) {
            return page.lines.map(function (line) {
              return line.content;
            }).join("\n");
          }).join("\n\n");
          timestamp = new Date().toISOString().replace(/:/g, "-");
          extension = _path["default"].extname(req.file.originalname);
          newFileName = "".concat(userId, "_").concat(timestamp).concat(extension);
          newFilePath = _path["default"].join(_path["default"].dirname(req.file.path), newFileName);
          _context.next = 25;
          return regeneratorRuntime.awrap(_cvModel["default"].findOneAndUpdate({
            userID: userId
          }, {
            userID: userId,
            cvContent: extractedText,
            cvBlobFileName: newFileName
          }, {
            upsert: true,
            "new": true
          }));

        case 25:
          fastApiUrl = "http://localhost:8000/process-text";
          _context.next = 28;
          return regeneratorRuntime.awrap(_axios["default"].post(fastApiUrl, {
            userId: userId,
            extractedText: extractedText
          }));

        case 28:
          response = _context.sent;
          data = response.data;
          fs.rename(req.file.path, newFilePath, function (err) {
            if (err) {
              console.error("Error renaming file:", err);
              return res.status(500).send("Failed to rename file.");
            }

            res.json({
              message: "File uploaded and OCR processed successfully",
              extractedText: extractedText,
              filePath: newFilePath,
              analysis: data.analysis,
              summary: data.summary
            });
          });
          _context.next = 37;
          break;

        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](6);
          console.error("OCR processing failed:", _context.t0);
          res.status(500).send("OCR processing failed.");

        case 37:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 33]]);
};

exports.processUpload = processUpload;