import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
	RoleName: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100,
	},
	RoleDescription: {
		type: String,
		required: true,
		maxlength: 255,
	},
	iconPath: {
		type: String,
		required: true,
	},
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
