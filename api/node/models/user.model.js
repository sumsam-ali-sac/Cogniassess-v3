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
		streak: {
			type: Number,
			default: 0,
		},
	},

	{ timestamps: true }
);

userSchema.methods.updateLoginStreak = function () {
	const today = new Date();
	const yesterday = new Date(today);

	yesterday.setDate(yesterday.getDate() - 1);

	today.setHours(0, 0, 0, 0);
	yesterday.setHours(0, 0, 0, 0);
	const lastLoginDate = new Date(this.lastLoginDate);
	lastLoginDate.setHours(0, 0, 0, 0);

	if (lastLoginDate.getTime() === yesterday.getTime()) {
		this.streak += 1;
	} else if (lastLoginDate.getTime() < yesterday.getTime()) {
		this.streak = 1; // Reset streak if there is a gap
	}

	this.lastLoginDate = today;
	return this.save();
};

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

const User = mongoose.model("User", userSchema);
export default User;
