import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const AssessmentTable = ({ Assessments, allQuestionsSolved }) => {
	const handleSubmitAssessment = () => {
		console.log("Submitting Assessment...");
		// Further submission logic here
	};
	return (
		<div className="flex mt-12 items-center justify-center mx-auto h-screen bg-dark-gray">
			<div className="bg-neutral-800 shadow-lg rounded-xl overflow-hidden w-3/4">
				<div className="overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-gray hover:scrollbar-thumb-hover-green">
					<div className="text-3xl text-center font-rubic font-black tracking-wide text-neon-green">
						Assessment Overview
					</div>
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
