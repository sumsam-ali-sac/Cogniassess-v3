import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PointsCard from "../components/PointsCard";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Points() {
	const questions = useSelector((state) => state.questions);
	const [points, setPoints] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	const evaluateQuestions = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			const response = await axios.post(
	// 				"api/node/assessment/evaluate",
	// 				{
	// 					questions,
	// 				}
	// 			);
	// 			setPoints(response.data.points);
	// 		} catch (error) {
	// 			console.error("Error evaluating questions:", error);
	// 		}
	// 		setIsLoading(false);
	// 	};

	// 	if (questions.length > 0) {
	// 		evaluateQuestions();
	// 	}
	// }, [questions]);

	return (
		<div className="flex flex-col bg-dark-gray min-h-screen justify-between">
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<PointsCard
						number={1}
						iconName="path_to_icon"
						title="Total Points"
						points={points}
					/>
				)}
				<div className="flex flex-col">
					<p className="text-xl mt-6 mb-4 font-rubic text-off-white font-black">
						Want to know why?
					</p>

					<button
						className="mb-2 px-4 py-2 rounded font-rubic font-bold bg-neon-green text-neutral-900 hover:bg-neutral-900 hover:text-neon-green transition duration-300 ease-in-out transform hover:scale-110 opacity-100 cursor-pointer"
						// onClick={handleSubmitAssessment}
						// disabled={!allQuestionsSolved}
					>
						Generate Feedback
					</button>
					<p className="text-xl mt-6 mb-4 font-rubic text-off-white font-black">
						Want to try another time?
					</p>
					<button
						className="mb-8 px-4 py-2 rounded font-rubic font-bold bg-neon-green text-neutral-900 hover:bg-neutral-900 hover:text-neon-green transition duration-300 ease-in-out transform hover:scale-110 opacity-100 cursor-pointer"
						// onClick={handleSubmitAssessment}
						// disabled={!allQuestionsSolved}
					>
						Homepage
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
}
