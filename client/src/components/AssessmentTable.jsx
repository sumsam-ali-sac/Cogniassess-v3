import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";

const AssessmentTable = ({
	Assessments,
	allQuestionsSolved,
	timeRemaining,
}) => {
	const navigate = useNavigate();
	const handleSubmitAssessment = () => {
		console.log("Submitting Assessment...");
		localStorage.removeItem("assessmentStartTime");
		navigate("/points");
	};

	return (
		<div className="flex items-center justify-center mx-auto h-screen bg-dark-gray">
			<div className="bg-neutral-800 shadow-lg rounded-xl overflow-hidden w-3/4">
				<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-gray hover:scrollbar-thumb-hover-green">
					<div className="text-3xl text-center font-rubic font-black tracking-wide text-neon-green">
						Assessment Overview
					</div>
					{!allQuestionsSolved && (
						<div className="flex justify-center bg-dark-gray items-center timer animate-pulse text-neon-green bg-clip-text p-2">
							<h2 className="text-xl font-rubic font-bold">
								Time Remaining: {timeRemaining}
							</h2>
						</div>
					)}
					<table className="min-w-full w-full">
						<TableHeader />
						<tbody className="text-neutral-300 font-light">
							{Object.values(Assessments).map((domain) => (
								<TableRow key={domain.id} domain={domain} />
							))}
						</tbody>
					</table>
				</div>
				<div className="flex justify-center">
					<button
						className={`mt-4 mb-4 px-4 py-2 rounded font-rubic font-bold bg-neon-green text-neutral-900 hover:bg-neutral-900 hover:text-neon-green transition duration-300 ease-in-out transform hover:scale-110 ${
							allQuestionsSolved
								? "opacity-100 cursor-pointer"
								: "opacity-50 cursor-not-allowed"
						}`}
						onClick={handleSubmitAssessment}
						disabled={!allQuestionsSolved}>
						Submit Assessment
					</button>
				</div>
			</div>
		</div>
	);
};

export default AssessmentTable;
