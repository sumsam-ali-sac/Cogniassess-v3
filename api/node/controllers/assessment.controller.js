import axios from "axios";
import CV from "../models/cv.model.js";
import Ranking from "../models/ranking.model.js";
import Domain from "../models/domain.model.js";
import mongoose from "mongoose";
import MistralClient from "@mistralai/mistralai";

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
	const { questions, role, user } = req.body;
	if (!questions || questions.length === 0) {
		return res
			.status(400)
			.json({ error: "No questions provided for evaluation." });
	}
	let all_questions = "";
	questions.forEach((entry) => {
		const { progress, status, ...filteredData } = entry;
		filteredData.questions = filteredData.questions.map(
			({ id, solved, text: question, ...rest }) => ({
				question,
				...rest,
			})
		);
		const str = JSON.stringify(filteredData);
		all_questions = all_questions + str;
	});

	const apiKey = "r7IgDHhcj8STs2uRjx3E5nXBOid89wDK";
	const client = new MistralClient(apiKey);
	const Evalprompt = `	
	Candidate Responses: 

	${all_questions}
	
	Evaluate the candidate's responses for a non-technical role based on the selected domains. Assess each answer for relevance, clarity, innovation, and how well they align with the job requirements. If responses appear to be placeholders or are inadequately detailed, this should be reflected in the evaluation. Assign a score out of 100 and provide constructive feedback.

	Task:

	Please ensure fairness in your evaluation Grade based on Alignment with Role Requirements, Innovation and Creativity , Clarity and Articulation , Relevance

	If the asnwers are unsatisfactory give straight zero.

	Return the results in a JSON object structured as follows:

	{
	"points": "Numerical score",
	"feedback": "Textual feedback summarizing the strengths and weaknesses of the candidate’s answers. If answers are placeholders or inadequate, recommend a resubmission for a 
		more accurate assessment."
	}

	Guidelines:

	Points: This key should contain the numerical score reflecting how well the candidate's answers meet the job role and domain expectations.
	Feedback: This key should provide feedback detailing strengths and weaknesses in the candidate's answers, including specific recommendations for improvement 
	or reasons for resubmission.

	MAKE SURE YOU FOLLOW THE JSON FORMAT GIVEN
	`;

	const chatResponse = await client.chat({
		model: "mistral-small-latest",
		response_format: { type: "json_object" },
		messages: [{ role: "user", content: Evalprompt }],
	});

	const Evaluation = chatResponse.choices[0].message.content;

	let obj = JSON.parse(Evaluation);

	const existingRanking = await Ranking.findOne({ userID: user.id });
	if (existingRanking) {
		const newScore = (existingRanking.rankScore + obj.points) / 2;
		await Ranking.updateOne({ userID: user.id }, { rankScore: newScore });
	} else {
		await new Ranking({ userID: user.id, rankScore: obj.points }).save();
	}

	res.json({
		message: "Answers Evaluated Successfully",
		points: obj.points,
		feedback: obj.feedback,
	});

	return obj;
};
