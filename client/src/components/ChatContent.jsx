import React from "react";

const ChatContent = () => {
	return (
		<div className="bg-gray-800 ml-2 mr-2 mt-5 p-2 rounded-2xl text-white overflow-auto max-h-screen">
			<div className="text justify-center p-4">
				<div className="bg-gray-900 text-green-400 p-5 rounded-md flex items-center mb-4">
					<img src="/logo.png" alt="Icon" className="mr-2 w-5 h-5" />
					Write me an essay on inspiration lead product design
				</div>
				<div className="bg-gray-800 border-b border-gray-500 p-5 rounded-md mb-4">
					<img src="/logo.png" alt="Icon" className="mr-2 w-6 h-5" />
					Welcome to CongiAssess, your advanced AI partner in personal
					and professional growth...
					{/* Add more text as needed */}
				</div>
			</div>
		</div>
	);
};

export default ChatContent;
