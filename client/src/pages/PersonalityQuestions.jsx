import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OptionButton = ({ value, label, selectedOption, handleOptionChange }) => (
	<button
		className={`transition duration-300 mr-4 mb-4 w-1/2 ease-in-out p-2 rounded-lg focus:outline-none flex-1 ${
			selectedOption === value
				? "bg-neon-green text-neutral-800 shadow-lg scale-110"
				: "bg-neutral-700 hover:bg-neutral-600 text-neon-green"
		}`}
		onClick={() =>
			handleOptionChange({
				target: { value },
			})
		}>
		{label}
	</button>
);
const PersonalityQuestions = () => {
	const [selectedOption, setSelectedOption] = useState("");

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	return (
		<div>
			<Navbar />
			<div className="bg-neutral-900 mx-auto min-h-screen flex flex-col justify-between">
				<div className="container mx-auto px-4 pt-12 pb-24">
					<div className="mt-32 mb-16 bg-neutral-800 overflow-y-auto p-8 md:w-3/4 mx-auto rounded-xl shadow-lg transform transition-all duration-500">
						<h2 className="text-4xl font-rubic font-black text-neon-green text-center mb-8">
							Personality Assessment
						</h2>
						{/* Question about handling challenges */}
						<div className="mb-10 font-worksans md:tracking-wider text-xl md:text-xl">
							<p className="text-off-white mb-4">
								On a scale of 1 to 5, with 1 being 'Strongly
								Disagree' and 5 being 'Strongly Agree', how
								would you rate your ability to adapt to change
								and handle unexpected challenges in the
								workplace?
							</p>
							<div className="flex flex-col md:flex-row justify-center gap-4">
								{[1, 2, 3, 4, 5].map((number) => (
									<OptionButton
										key={number}
										value={`option${number}`}
										label={number.toString()}
										selectedOption={selectedOption}
										handleOptionChange={handleOptionChange}
									/>
								))}
							</div>
						</div>
						{/* Question about work approach */}
						<div className="font-worksans md:tracking-wider text-xl md:text-xl">
							<p className="text-off-white mb-4 ">
								Choose one word that you feel best describes
								your approach to work. Select one option.
							</p>
							<div className="flex flex-col md:flex-row justify-between">
								{[
									"Methodical",
									"Innovative",
									"Collaborative",
									"Cool",
								].map((word) => (
									<OptionButton
										key={word}
										value={word}
										label={word}
										selectedOption={selectedOption}
										handleOptionChange={handleOptionChange}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default PersonalityQuestions;
