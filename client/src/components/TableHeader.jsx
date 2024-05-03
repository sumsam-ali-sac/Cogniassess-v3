import React from "react";

const TableHeader = () => (
	<thead>
		<tr className="bg-neon-green text-neutral-800 md:text-base text-xs uppercase font-rubic font-black">
			<th className="py-3 px-6 text-left">Domain</th>
			<th className="py-3 px-6 text-center">Status</th>
			<th className="py-3 px-6 text-center">Progress</th>
			<th className="py-3 px-6 text-center">Proceed</th>
		</tr>
	</thead>
);

export default TableHeader;
