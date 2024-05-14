"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports.google = exports.signin = exports.signup = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _argon = _interopRequireDefault(require("argon2"));

var _error = require("../utils/error.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key))
				continue;
			target[key] = source[key];
		}
	}
	return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}

var signup = function signup(req, res, next) {
	var _req$body,
		username,
		email,
		password,
		registeredStatus,
		userRole,
		hashedPassword,
		newUser;

	return regeneratorRuntime.async(
		function signup$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						console.log(req.body);
						console.log("hello");
						(_req$body = req.body),
							(username = _req$body.username),
							(email = _req$body.email),
							(password = _req$body.password),
							(registeredStatus = _req$body.registeredStatus),
							(userRole = _req$body.userRole);
						_context.prev = 3;
						_context.next = 6;
						return regeneratorRuntime.awrap(
							_argon["default"].hash(password)
						);

					case 6:
						hashedPassword = _context.sent;
						newUser = new _userModel["default"]({
							username: username,
							email: email,
							password: hashedPassword,
							registeredStatus: registeredStatus,
							userRole: userRole,
						});
						console.log(newUser);
						_context.prev = 9;
						_context.next = 12;
						return regeneratorRuntime.awrap(newUser.save());

					case 12:
						res.status(201).json("User created successfully!");
						_context.next = 18;
						break;

					case 15:
						_context.prev = 15;
						_context.t0 = _context["catch"](9);
						next(_context.t0);

					case 18:
						_context.next = 23;
						break;

					case 20:
						_context.prev = 20;
						_context.t1 = _context["catch"](3);
						next(_context.t1);

					case 23:
					case "end":
						return _context.stop();
				}
			}
		},
		null,
		null,
		[
			[3, 20],
			[9, 15],
		]
	);
};

exports.signup = signup;

var signin = function signin(req, res, next) {
	var _req$body2, email, password, user, validPassword, token;

	return regeneratorRuntime.async(
		function signin$(_context2) {
			while (1) {
				switch ((_context2.prev = _context2.next)) {
					case 0:
						console.log(req.body);
						(_req$body2 = req.body),
							(email = _req$body2.email),
							(password = _req$body2.password);
						_context2.prev = 2;
						_context2.next = 5;
						return regeneratorRuntime.awrap(
							_userModel["default"].findOne({
								email: email,
							})
						);

					case 5:
						user = _context2.sent;

						if (user) {
							_context2.next = 8;
							break;
						}

						return _context2.abrupt(
							"return",
							next(
								(0, _error.errorHandler)(404, "User not found")
							)
						);

					case 8:
						_context2.next = 10;
						return regeneratorRuntime.awrap(
							_argon["default"].verify(user.password, password)
						);

					case 10:
						validPassword = _context2.sent;

						if (validPassword) {
							_context2.next = 13;
							break;
						}

						return _context2.abrupt(
							"return",
							next(
								(0, _error.errorHandler)(
									401,
									"Invalid credentials"
								)
							)
						);

					case 13:
						token = _jsonwebtoken["default"].sign(
							{
								userId: user._id,
								userRole: user.userRole,
							},
							process.env.JWT_SECRET,
							{
								expiresIn: process.env.JWT_ACCESS_EXPIRATION,
							}
						);
						res.cookie("token", token, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							// Ensure cookies are secure in production
							maxAge: 3600000,
							sameSite: "strict",
						});
						res.status(200).json({
							message: "Authentication successful",
							user: {
								id: user._id,
								username: user.username,
								email: user.email,
								userRole: user.userRole,
								avatar: user.avatar,
							},
						});
						_context2.next = 21;
						break;

					case 18:
						_context2.prev = 18;
						_context2.t0 = _context2["catch"](2);
						next(_context2.t0);

					case 21:
					case "end":
						return _context2.stop();
				}
			}
		},
		null,
		null,
		[[2, 18]]
	);
};

exports.signin = signin;

var google = function google(req, res, next) {
	var user,
		_user$_doc,
		pass,
		rest,
		token,
		generatedPassword,
		hashedPassword,
		newUser,
		_token,
		_newUser$_doc,
		_pass,
		_rest;

	return regeneratorRuntime.async(
		function google$(_context3) {
			while (1) {
				switch ((_context3.prev = _context3.next)) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return regeneratorRuntime.awrap(
							_userModel["default"].findOne({
								email: req.body.email,
							})
						);

					case 3:
						user = _context3.sent;

						if (!user) {
							_context3.next = 11;
							break;
						}

						(_user$_doc = user._doc),
							(pass = _user$_doc.password),
							(rest = _objectWithoutProperties(_user$_doc, [
								"password",
							]));
						token = _jsonwebtoken["default"].sign(
							{
								userId: user._id,
								userRole: user.userRole,
							},
							process.env.JWT_SECRET,
							{
								expiresIn: process.env.JWT_ACCESS_EXPIRATION,
							}
						);
						res.cookie("token", token, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							maxAge: 3600000,
							sameSite: "strict",
						});
						res.status(200).json({
							message: "Authentication successful",
							user: {
								id: user._id,
								username: user.username,
								email: user.email,
								userRole: user.userRole,
								avatar: user.avatar,
							},
						});
						_context3.next = 23;
						break;

					case 11:
						generatedPassword = "google Auth";
						_context3.next = 14;
						return regeneratorRuntime.awrap(
							_argon["default"].hash(generatedPassword)
						);

					case 14:
						hashedPassword = _context3.sent;
						newUser = new _userModel["default"]({
							username:
								req.body.name
									.split(" ")
									.join("")
									.toLowerCase() +
								Math.random().toString(36).slice(-4),
							email: req.body.email,
							password: hashedPassword,
							avatar: req.body.photo,
						});
						_context3.next = 18;
						return regeneratorRuntime.awrap(newUser.save());

					case 18:
						_token = _jsonwebtoken["default"].sign(
							{
								id: newUser._id,
							},
							process.env.JWT_SECRET
						);
						(_newUser$_doc = newUser._doc),
							(_pass = _newUser$_doc.password),
							(_rest = _objectWithoutProperties(_newUser$_doc, [
								"password",
							]));
						res.cookie("token", _token, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							maxAge: 3600000,
							sameSite: "strict",
						});
						console.log(newUser._id);
						res.status(200).json({
							message: "Authentication successful",
							user: {
								id: newUser._id,
								username: newUser.username,
								email: newUser.email,
								userRole: newUser.userRole,
								avatar: newUser.avatar,
							},
						});

					case 23:
						_context3.next = 28;
						break;

					case 25:
						_context3.prev = 25;
						_context3.t0 = _context3["catch"](0);
						next(_context3.t0);

					case 28:
					case "end":
						return _context3.stop();
				}
			}
		},
		null,
		null,
		[[0, 25]]
	);
};

exports.google = google;
