const recruiterSchema = new Schema({
	userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
