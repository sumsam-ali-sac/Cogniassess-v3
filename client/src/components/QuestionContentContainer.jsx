import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdVolumeUp } from "react-icons/md"; // Import for read aloud icon

import {
	toggleSolved,
	saveAnswer,
	updateProgress,
	updateStatus,
} from "../redux/questions/questionsSlice";

const QuestionContentContainer = ({ entryIndex, entry, domain }) => {
	const dispatch = useDispatch();
	dispatch(updateProgress({ entryIndex }));
	const navigate = useNavigate();
	const [questions, setQuestions] = useState(entry.questions);

	useEffect(() => {
		setQuestions(entry.questions);
	}, [entry.questions]);

	const handleAnswerChange = (index, value) => {
		const updatedQuestions = questions.map((question, idx) =>
			idx === index ? { ...question, answer: value } : question
		);
		setQuestions(updatedQuestions);
	};

	const handleReadAloud = (text) => {
		const speech = new SpeechSynthesisUtterance(text);
		const voices = window.speechSynthesis.getVoices();
		const voice = voices.find(
			(v) => v.lang === "en-US" && v.name.includes("Google")
		);

		if (voice) {
			speech.voice = voice;
		}

		window.speechSynthesis.speak(speech);
	};

	const handleSaveQuestion = (question) => {
		dispatch(saveAnswer({ entryIndex, question }));
		dispatch(updateProgress({ entryIndex }));
		dispatch(updateStatus({ entryIndex }));
	};

	const handleToggleSolved = (question) => {
		dispatch(toggleSolved({ entryIndex, question }));
		const updatedQuestion = { ...question, solved: !question.solved };
		handleSaveQuestion(updatedQuestion);
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className="bg-dark-gray w-full min-h-screen">
			<div className="flex flex-col items-center justify-center px-4 py-5">
				<div className="mt-20 mb-8 container mx-auto px-4">
					<div className="bg-neutral-800 p-5 w-3/4 mx-auto my-auto rounded-xl">
						<h1 className="text-3xl font-rubic font-black text-neon-green text-center mb-4">
							{domain}
						</h1>
						{questions.map((question, index) => (
							<div
								key={index}
								className="mb-6 rounded-xl mx-auto"
								style={{ maxWidth: "768px" }}>
								<div>
									<p className="text-neutral-300 mb-4 font-worksans tracking-wide font-bold">
										{question.text}
										<button
											data-tooltip-id="readaloud-inline"
											data-tooltip-content="Read question aloud"
											onClick={() =>
												handleReadAloud(question.text)
											}
											className="mt-1 ml-2 text-neon-green hover:text-hover-green transition duration-300 ease-in-out"
											title="Click to read aloud">
											<MdVolumeUp />
										</button>
									</p>

									<Tooltip
										id="readaloud-inline"
										style={{
											backgroundColor: "rgb(215,239,67)",
											color: "#222",
										}}
									/>
								</div>

								<div className="flex items-center">
									<textarea
										className="scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-gray hover:scrollbar-thumb-hover-green h-40 w-full p-4 text-off-white bg-neutral-800 border border-gray-600 font-worksans rounded-lg focus:outline-none focus:border-neon-green"
										value={question.answer}
										onChange={(e) =>
											handleAnswerChange(
												index,
												e.target.value
											)
										}
									/>
								</div>
								<button
									className={`mt-4 px-4 py-2 font-worksans tracking-wide font-bold cursor-pointer rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 ${
										question.solved
											? "bg-dark-gray text-neon-green border-neon-green"
											: "bg-neon-green text-black border-neon-green"
									}`}
									onClick={() =>
										handleToggleSolved(question)
									}>
									{question.solved ? (
										<>
											<FaCheck className="inline mr-2 text-xl animate-fadeIn" />
											Mark Unsolved
										</>
									) : (
										"Mark Solved"
									)}
								</button>
							</div>
						))}
						<div className="flex md:justify-center mt-4">
							<button
								className="mt-4 px-4 py-2 bg-neutral-700 rounded-lg text-white font-bold hover:bg-neutral-600 transition duration-300 ease-in-out transform hover:scale-110"
								onClick={goBack}>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionContentContainer;
