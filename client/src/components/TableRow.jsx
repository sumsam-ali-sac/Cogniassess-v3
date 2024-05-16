import React from "react";
import { useSelector } from "react-redux";
import StatusBadge from "./StatusBadge";
import Proceed from "./Proceed";
import AssessmentProgress from "./AssessmentProgess";
const TableRow = ({ domain }) => {
	if (domain != null) {
		const Entry = useSelector((state) =>
			state.questions.find((entry) => entry.domain === domain.name)
		);

		if (Entry.domain != null) {
			return (
				<tr className="hover:bg-neutral-700">
					<td className="py-4 px-6 whitespace-nowrap">
						<div className="flex items-center">
							<img
								src={domain.iconPath}
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
		}
	}
};

export default TableRow;
