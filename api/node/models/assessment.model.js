const assessmentSchema = new Schema(
	{
		userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		roleID: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
		domainID: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Domain",
		},
		questions: [
			{
				questionID: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Question",
				},
				response: { type: String, required: false },
				score: { type: Number, required: false },
			},
		],
		totalScore: { type: Number, default: 0 },
		startTime: { type: Date, default: Date.now },
		endTime: { type: Date },
		status: {
			type: String,
			enum: ["Not Started", "In Progress", "Completed"],
			default: "Not Started",
		},
	},
	{ timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);
