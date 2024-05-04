import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PointsCard from "../components/PointsCard";
import Spinner from "../components/Spinner"; // Assuming this is your spinner component
import { useSelector } from "react-redux";
import axios from "axios";

export default function Points() {
	const questions = useSelector((state) => state.questions);
	const role = useSelector((state) => state.roles.selectedRole);

	const [points, setPoints] = useState(0);
	const [isLoading, setIsLoading] = useState(true); // Start as true since we're loading immediately

	useEffect(() => {
		const evaluateQuestions = async () => {
			try {
				const response = await axios.post(
					"api/node/assessment/evaluate",
					{
						questions,
						role,
					}
				);
				setPoints(response.data.points);
			} catch (error) {
				console.error("Error evaluating questions:", error);
			}
			setIsLoading(false);
		};

		// Run this immediately after component mounts
		evaluateQuestions();
	}, []); // Empty dependency array means this runs only once, when the component mounts

	return (
		<div className="flex flex-col bg-dark-gray min-h-screen justify-between">
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				{isLoading ? (
					<Spinner /> // Show spinner while loading
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
