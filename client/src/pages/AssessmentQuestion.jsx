import React, { useMemo } from "react";
import QuestionContentContainer from "../components/QuestionContentContainer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AssessmentQuestion = () => {
	const { domainName } = useParams();

	const questions = useSelector((state) => state.questions);

	const { entry, index } = useMemo(() => {
		const foundIndex = questions.findIndex(
			(entry) => entry.domain === domainName
		);
		const foundEntry = questions[foundIndex];
		return { entry: foundEntry, index: foundIndex };
	}, [questions, domainName]);

	console.log(entry, index);
	return (
		<div>
			<Navbar />
			<div className="bg-dark-gray">
				<QuestionContentContainer
					domain={domainName}
					entry={entry}
					entryIndex={index}
				/>
			</div>
			<Footer />
		</div>
	);
};

export default AssessmentQuestion;
