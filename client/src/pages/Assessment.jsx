import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AssessmentTable from "../components/AssessmentTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { addQuestions } from "../redux/questions/questionsSlice";

import axios from "axios";

export default function Assessment() {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);

	const selectedDomains = useSelector(
		(state) => state.domains.selectedDomains
	);
	const selectedRole = useSelector((state) => state.roles.selectedRole);
	const questionsState = useSelector((state) => state.questions);
	const [AssessmentTableConfig, setAssessmentTableConfig] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");
	const [allQuestionsSolved, setAllQuestionsSolved] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		} else {
			const sendDomainsAndGetAssessment = async () => {
				setStatusMessage("Generating Assessment");
				setIsUploading(true);

				const needsFetching = Object.keys(selectedDomains).some(
					(key) =>
						!questionsState.find(
							(q) => q.domain === selectedDomains[key]["name"]
						)
				);

				if (needsFetching) {
					const requests = Object.keys(selectedDomains).map((key) => {
						return axios
							.post("api/node/assessment/generate", {
								selectedDomain: selectedDomains[key],
								selectedRole: selectedRole,
								userId: user.id,
							})
							.then((response) => ({
								domain: response.data.questions[0].domain,
								questions: response.data.questions[0].questions,
							}))
							.catch((error) => {
								console.error(
									"Error processing domain:",
									selectedDomains[key]["name"],
									error
								);
								return null;
							});
					});

					try {
						const results = await Promise.all(requests);
						results.forEach((result) => {
							if (result) {
								console.log(result);
								dispatch(addQuestions(result));
							}
						});
						setAssessmentTableConfig(selectedDomains);
						startTimer(); // Start the timer after assessment is generated
					} catch (error) {
						console.error("Failed to process all domains:", error);
					}
				} else {
					console.log("Using existing questions from state");
					setAssessmentTableConfig(selectedDomains);
					startTimer(); // Start the timer if using existing questions
				}

				setIsUploading(false);
			};

			sendDomainsAndGetAssessment();
		}
	}, [
		user,
		navigate,
		selectedDomains,
		selectedRole,
		questionsState,
		dispatch,
	]);

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
		const allSolved = questionsState.every((entry) =>
			entry.questions.every((q) => q.solved)
		);
		setAllQuestionsSolved(allSolved);
	}, [questionsState]);

	// Timer logic
	const startTimer = () => {
		const timerDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
		const storedStartTime = localStorage.getItem("assessmentStartTime");
		const startTime = storedStartTime
			? new Date(storedStartTime)
			: new Date();

		if (!storedStartTime) {
			localStorage.setItem(
				"assessmentStartTime",
				startTime.toISOString()
			);
		}

		const calculateRemainingTime = () => {
			const currentTime = new Date();
			const elapsedTime =
				currentTime -
				new Date(localStorage.getItem("assessmentStartTime"));
			const remaining = timerDuration - elapsedTime;
			setRemainingTime(remaining > 0 ? remaining : 0);

			if (remaining <= 0) {
				console.log("Time's up!");
				localStorage.removeItem("assessmentStartTime");
				clearInterval(timerInterval);
				navigate("/points");
			}
		};

		const timerInterval = setInterval(calculateRemainingTime, 1000);
		calculateRemainingTime(); // Initial call to set remaining time

		return () => clearInterval(timerInterval);
	};

	const formatTime = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
			2,
			"0"
		)}:${String(seconds).padStart(2, "0")}`;
	};

	return (
		<div className="bg-dark-gray">
			<Navbar />
			{isUploading && <Spinner text={statusMessage} />}
			<AssessmentTable
				Assessments={AssessmentTableConfig}
				allQuestionsSolved={allQuestionsSolved}
				timeRemaining={formatTime(remainingTime)}
			/>
			<Footer />
		</div>
	);
}
