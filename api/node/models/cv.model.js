import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cvSchema = new Schema({
	userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	cvContent: { type: String, default: null },
	cvBlobFileName: { type: String, default: null },
});

const CV = mongoose.model("CV", cvSchema);
export default CV;
