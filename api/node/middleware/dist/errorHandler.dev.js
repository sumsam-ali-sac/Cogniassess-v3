"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

function errorHandler(err, req, res, next) {
  var statusCode = err.statusCode || 500;
  console.log(err);

  if (err.name === "ValidationError") {
    var errors = Object.values(err.errors).map(function (el) {
      return el.message;
    });
    var fields = Object.values(err.errors).map(function (el) {
      return el.path;
    });
    res.status(400).json({
      success: false,
      message: "".concat(errors.join(" and "), " Please ensure unique values for: ").concat(fields.join(", "), ".")
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: err.message || "An unexpected error occurred."
    });
  }
}