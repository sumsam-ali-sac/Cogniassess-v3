import React from "react";

const TextDisplay = ({ title, text }) => {
	return (
		<div className="bg-neutral-700 text-white p-6 rounded-lg mx-2 my-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl mb-6">
			<h3 className="text-neon-green font-rubic font-black text-2xl mb-2">
				{title}
			</h3>
			<p className=" text-left whitespace-pre-wrap font-worksans text-base font-normal">
				{text}
			</p>
		</div>
	);
};

export default TextDisplay;
