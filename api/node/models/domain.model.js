import mongoose from "mongoose";
const Schema = mongoose.Schema;

const domainSchema = new Schema({
	DomainName: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100,
	},
	iconPath: {
		type: String,
		required: true,
	},
	roles: [
		{
			type: Schema.Types.ObjectId,
			ref: "Role",
		},
	],
});

const Domain = mongoose.model("Domain", domainSchema);
export default Domain;
