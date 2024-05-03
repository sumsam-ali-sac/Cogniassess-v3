import React from "react";

const AssessmentProgress = ({ progress }) => (
	<div className="relative w-full bg-gray-200 rounded-full dark:bg-neutral-900">
		<div
			className="bg-neon-green text-xs font-medium text-neutral-700 text-center p-0.5 leading-none rounded-full"
			style={{ width: `${progress}%` }}>
			{progress}%
		</div>
	</div>
);

export default AssessmentProgress;
