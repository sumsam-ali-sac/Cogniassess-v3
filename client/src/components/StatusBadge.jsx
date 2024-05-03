import React from "react";

const StatusBadge = ({ status }) => {
	const statusClasses = {
		"not started": "bg-blue-200 text-blue-800",
		"in progress": "bg-yellow-200 text-yellow-800",
		completed: "bg-green-200 text-green-800",
		done: "bg-red-200 text-red-800",
		default: "bg-gray-200 text-gray-800",
	};
	const statusClass =
		statusClasses[status.toLowerCase()] || statusClasses["default"];

	return (
		<span
			className={`px-4 py-1 rounded-full md:text-base text-xs font-worksans font-semibold ${statusClass}`}>
			{status}
		</span>
	);
};

export default StatusBadge;
