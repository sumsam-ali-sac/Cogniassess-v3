"use strict";

var _aiFormRecognizer = require("@azure/ai-form-recognizer");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var key = process.env.AZURE_OCR_KEY;
var endpoint = process.env.AZURE_OCR_ENDPOINT; // sample document

var formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf";

function main() {
  var client, poller, _ref, pages, tables, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, page, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, table;

  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          client = new _aiFormRecognizer.DocumentAnalysisClient(endpoint, new _aiFormRecognizer.AzureKeyCredential(key));
          _context.next = 3;
          return regeneratorRuntime.awrap(client.beginAnalyzeDocumentFromUrl("prebuilt-layout", formUrl));

        case 3:
          poller = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(poller.pollUntilDone());

        case 6:
          _ref = _context.sent;
          pages = _ref.pages;
          tables = _ref.tables;

          if (!(pages.length <= 0)) {
            _context.next = 13;
            break;
          }

          console.log("No pages were extracted from the document.");
          _context.next = 33;
          break;

        case 13:
          console.log("Pages:");
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 17;

          for (_iterator = pages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            page = _step.value;
            console.log("- Page", page.pageNumber, "(unit: ".concat(page.unit, ")"));
            console.log("  ".concat(page.width, "x").concat(page.height, ", angle: ").concat(page.angle));
            console.log("  ".concat(page.lines.length, " lines, ").concat(page.words.length, " words"));
          }

          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](17);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 25:
          _context.prev = 25;
          _context.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context.prev = 28;

          if (!_didIteratorError) {
            _context.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context.finish(28);

        case 32:
          return _context.finish(25);

        case 33:
          if (!(tables.length <= 0)) {
            _context.next = 37;
            break;
          }

          console.log("No tables were extracted from the document.");
          _context.next = 57;
          break;

        case 37:
          console.log("Tables:");
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 41;

          for (_iterator2 = tables[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            table = _step2.value;
            console.log("- Extracted table: ".concat(table.columnCount, " columns, ").concat(table.rowCount, " rows (").concat(table.cells.length, " cells)"));
          }

          _context.next = 49;
          break;

        case 45:
          _context.prev = 45;
          _context.t1 = _context["catch"](41);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 49:
          _context.prev = 49;
          _context.prev = 50;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 52:
          _context.prev = 52;

          if (!_didIteratorError2) {
            _context.next = 55;
            break;
          }

          throw _iteratorError2;

        case 55:
          return _context.finish(52);

        case 56:
          return _context.finish(49);

        case 57:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[17, 21, 25, 33], [26,, 28, 32], [41, 45, 49, 57], [50,, 52, 56]]);
}

main()["catch"](function (error) {
  console.error("An error occurred:", error);
  process.exit(1);
});