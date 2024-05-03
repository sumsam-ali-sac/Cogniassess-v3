import React from "react";

const ChatInput = () => {
	return (
		<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-full bg-gray-800 p-5 z-10">
			<textarea
				className="w-3/4 p-2 bg-gray-700 text-white rounded-md"
				placeholder="Message CogniAssess..."
				rows="3"></textarea>
			<button className="ml-4 bg-green-400 text-black font-bold py-2 px-5 rounded-lg hover:bg-gray-700 hover:text-green-400">
				Send
			</button>
		</div>
	);
};

export default ChatInput;
