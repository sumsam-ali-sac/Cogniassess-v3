import React from "react";
import { FaRobot, FaHome, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
	return (
		<div className="h-full w-64 bg-gray-800 text-white fixed">
			<div className="p-5 text-2xl font-bold">My Chatbot</div>
			<ul className="mt-12">
				<li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300">
					<FaHome className="mr-4" /> Home
				</li>
				<li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300">
					<FaRobot className="mr-4" /> Chatbot
				</li>
				<li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-300">
					<FaEnvelope className="mr-4" /> Contact
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
