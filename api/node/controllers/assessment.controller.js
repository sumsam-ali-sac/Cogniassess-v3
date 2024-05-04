import axios from "axios";
import CV from "../models/cv.model.js";
import Role from "../models/role.model.js";
import Domain from "../models/domain.model.js";
import mongoose from "mongoose";

export const generate = async (req, res) => {
	let { selectedDomain, selectedRole } = req.body;
	const userId = req.body.userId || req.header("X-User-ID");

	console.log(userId);

	selectedRole = String(selectedRole);
	selectedDomain = String(selectedDomain["name"]);
	const fastApiUrl = "http://localhost:8000/generate-questions";

	try {
		const userCV = await CV.findOne({ userID: userId });

		if (!userCV) {
			throw new Error("CV not found for the user");
		}

		const cvContent = userCV.cvContent;

		const response = await axios.post(fastApiUrl, {
			selectedDomain,
			selectedRole,
			cvContent,
		});

		if (response.status === 200) {
			console.log(response.data);
			res.json(response.data);
		} else {
			throw new Error(
				"Failed to generate questions from the FastAPI backend"
			);
		}
	} catch (error) {
		console.error(`Error in generating questions: ${error}`);
		res.status(500).json({
			error: `Failed to generate questions: ${error.message}`,
		});
	}
};

export const evaluate = async (req, res) => {
	// Your implementation for evaluate
};
