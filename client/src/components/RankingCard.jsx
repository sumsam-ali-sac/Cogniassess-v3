import React from "react";

const RankingCard = ({ ranking, iconName, title }) => (
	<div className=" relative inline-block bg-neutral-700 rounded-lg text-white m-3 p-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
		<div className="absolute top-5 left-0 transform -translate-y-1/3 translate-x-1/4">
			<div className="flex items-center justify-center bg-neutral-800 rounded-full h-7 w-7">
				<span className="text-xs font-worksans font-bold text-off-white">
					{ranking}
				</span>
			</div>
		</div>
		<div className="mb-4">
			<img
				className="h-24 w-24 mx-auto rounded-full"
				src={iconName}
				alt={title}
			/>
		</div>
		<div className="text-base font-worksans font-bold">{title}</div>
	</div>
);

export default RankingCard;
