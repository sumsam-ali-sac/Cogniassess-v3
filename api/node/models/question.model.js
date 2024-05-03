const questionSchema = new Schema({
	content: { type: String, required: true },
	type: { type: String, required: true, maxlength: 50 },
	domain: { type: Schema.Types.ObjectId, required: true, ref: "Domain" },
	targetedRole: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
});

const Question = mongoose.model("Question", questionSchema);
