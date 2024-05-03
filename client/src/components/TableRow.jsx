import React from "react";
import { useSelector } from "react-redux";
import StatusBadge from "./StatusBadge";
import Proceed from "./Proceed";
import AssessmentProgress from "./AssessmentProgess";
const TableRow = ({ domain }) => {
	const Entry = useSelector((state) =>
		state.questions.find((entry) => entry.domain === domain.name)
	);

	return (
		<tr className="hover:bg-neutral-700">
			<td className="py-4 px-6 whitespace-nowrap">
				<div className="flex items-center">
					<img
						src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
						className="w-10 h-10 rounded-full mr-3"
						alt=""
					/>
					<div>
						<a
							href="#"
							className="font-worksans md:text-lg text-xs font-medium text-neutral-300 hover:text-neon-green">
							{Entry.domain}
						</a>
					</div>
				</div>
			</td>
			<td className="py-3 px-6 text-center whitespace-nowrap">
				<StatusBadge status={Entry.status} />
			</td>
			<td className="py-3 px-6 text-center whitespace-nowrap">
				<AssessmentProgress progress={Entry.progress} />
			</td>
			<td className="py-3 px-6 text-center whitespace-nowrap">
				<Proceed domainName={Entry.domain} />
			</td>
		</tr>
	);
};

export default TableRow;
