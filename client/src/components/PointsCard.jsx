import React from "react";

const PointsCard = ({ number, iconName, title, points }) => (
	<div className="flex flex-col  mt-32 mb-4 mx-auto items-center justify-center bg-neutral-700 rounded-lg text-white m-3 p-5 h-80 w-80 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
		<div className="mb-4">
			<img
				className="w-32 h-32 rounded-full"
				// src={iconName}
				src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
				alt={title}
			/>
		</div>
		<div className="text-3xl font-rubic  font-black">{title}</div>
		<div className="mt-2 text-xl text-center font-worksans tracking-widest">
			{points}
		</div>
	</div>
);

export default PointsCard;
