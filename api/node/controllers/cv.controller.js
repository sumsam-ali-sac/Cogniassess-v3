import CV from "../models/cv.model.js";
import axios from "axios";
export const checkIfCvContentExists = async (req, res) => {
	try {
		const userId = req.params.userId;
		const cv = await CV.findOne({ userID: userId }).exec();

		if (!cv) {
			return res
				.status(404)
				.json({ message: "No CV found for this user." });
		}

		res.json(cv);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const analyzeCV = async (req, res) => {
	try {
		const { extractedText, userId } = req.body;
		console.log(extractedText, userId);
		const fastApiUrl = "http://localhost:8000/analysis";
		const response = await axios.post(fastApiUrl, {
			userId,
			extractedText,
		});
		const data = response.data;
		res.json({
			message: "File analyzed successfully!",
			analysis: data.analysis,
			summary: data.summary,
		});

		return data;
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
