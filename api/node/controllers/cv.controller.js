import CV from "../models/cv.model.js";

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
