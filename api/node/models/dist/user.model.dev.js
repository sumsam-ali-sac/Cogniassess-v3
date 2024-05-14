"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true,
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _mongooseUniqueValidator = _interopRequireDefault(
	require("mongoose-unique-validator")
);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			maxlength: 255,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			maxlength: 255,
			trim: true,
			validate: {
				validator: _validator["default"].isEmail,
				message: "{VALUE} is not a valid email address",
			},
		},
		password: {
			type: String,
			required: true,
			maxlength: 255,
		},
		registeredStatus: {
			type: Boolean,
			default: false,
		},
		userRole: {
			type: String,
			required: true,
			enum: ["Candidate", "Recruiter"],
			default: "Candidate",
		},
		avatar: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
		},
	},
	{
		timestamps: true,
	}
);
userSchema.plugin(_mongooseUniqueValidator["default"], {
	message: "{PATH} must be unique.",
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;
