"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _ocrController = require("../controllers/ocr.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Set up custom storage for multer
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function filename(req, file, cb) {
    var fileExtension = file.originalname.split(".").pop();
    var newFilename = file.fieldname + "-" + Date.now() + "." + fileExtension;
    cb(null, newFilename);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});

var ocrRouter = _express["default"].Router();

ocrRouter.post("/ocr", upload.single("file"), _ocrController.processUpload);
var _default = ocrRouter;
exports["default"] = _default;