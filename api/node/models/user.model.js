import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

const userSchema = new Schema(
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
				validator: validator.isEmail,
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

	{ timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

const User = mongoose.model("User", userSchema);
export default User;
