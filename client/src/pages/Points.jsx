import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PointsCard from "../components/PointsCard";
import Spinner from "../components/Spinner";
import { setFeedback, setPoints } from "../redux/assessments/assessmentSlice";

export default function Points() {
	const questions = useSelector((state) => state.questions);
	const role = useSelector((state) => state.roles.selectedRole);
	const points = useSelector((state) => state.assessment.points);
	const feedback = useSelector((state) => state.assessment.feedback);
	const user = useSelector((state) => state.user.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showFeedback, setShowFeedback] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		} else if (points === null || feedback === null) {
			const evaluateQuestions = async () => {
				setIsLoading(true);
				try {
					const response = await axios.post(
						"api/node/assessment/evaluate",
						{ questions, role, user }
					);
					dispatch(setPoints(response.data.points));
					dispatch(setFeedback(response.data.feedback));
				} catch (error) {
					console.error("Error evaluating questions:", error);
				}
				setIsLoading(false);
			};

			evaluateQuestions();
		} else {
			setIsLoading(false);
		}
	}, [dispatch, questions, role, points, feedback, user, navigate]);

	const toggleFeedback = () => {
		setShowFeedback(!showFeedback);
	};

	const handleGoHome = () => {
		navigate("/");
	};

	const handleGoChat = () => {
		navigate("/feedback-bot");
	};

	return (
		<div className="flex flex-col min-h-screen justify-between bg-dark-gray">
			<Navbar />
			<div className="container mx-auto p-4 text-center">
				{isLoading ? (
					<Spinner text="Evaluating assessment" />
				) : (
					<div className="font-worksans tracking-wide text-lg">
						<PointsCard
							number={1}
							iconName="path_to_icon"
							title="Total Points"
							points={points}
						/>

						<div className="flex flex-col items-center">
							<button
								className="mt-6 w-full md:w-1/3 py-2 rounded bg-neon-green text-neutral-800 hover:bg-neutral-800 hover:text-neon-green transition duration-300 ease-in-out"
								onClick={toggleFeedback}>
								{showFeedback
									? "Hide Feedback"
									: "Show Feedback"}
							</button>

							<div
								className={`overflow-hidden transition-max-height duration-700 ease-in-out ${
									showFeedback ? "max-h-80" : "max-h-0"
								}`}>
								<div className="my-4 p-4 w-full md:w-1/3 mx-auto bg-gray-200 rounded shadow-md">
									<p className="text-lg text-neutral-800">
										{feedback}
									</p>
								</div>
							</div>

							<button
								className="mt-6 mb-8 w-full md:w-1/3 py-2 rounded bg-neon-green text-neutral-800 hover:bg-neutral-800 hover:text-neon-green transition duration-300 ease-in-out"
								onClick={handleGoChat}>
								Chat with Cogniassess
							</button>
							<button
								className="mt-6 mb-8 w-full md:w-1/3 py-2 rounded bg-neon-green text-neutral-800 hover:bg-neutral-800 hover:text-neon-green transition duration-300 ease-in-out"
								onClick={handleGoHome}>
								Homepage
							</button>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}
