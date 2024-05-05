import React, { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const ExpandingTextarea = ({ onSend }) => {
	const [text, setText] = useState("");
	const [currentRows, setcurrentRows] = useState(1);
	const handleChange = (event) => {
		const textareaLineHeight = 24;
		event.target.rows = 1;

		setcurrentRows(
			Math.floor(event.target.scrollHeight / textareaLineHeight) - 1
		);

		if (currentRows >= 4) {
			event.target.rows = 4;
			event.target.style.overflowY = "auto";
		} else {
			event.target.rows = currentRows;
			event.target.style.overflowY = "hidden";
		}

		setText(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			setcurrentRows(1);
			event.target.rows = currentRows;
			event.target.style.overflowY = "hidden";
			event.preventDefault();
			sendMessage();
		}
	};

	const sendMessage = () => {
		if (text.trim()) {
			setcurrentRows(1);

			onSend(text.trim());
			setText("");
		}
	};

	return (
		<div className="fixed bottom-0  left-0 right-0 mb-6 mx-auto md:w-4/5 p-3 bg-neutral-800 rounded-full flex items-center z-50">
			<textarea
				rows="1"
				value={text}
				placeholder="Enter a prompt here"
				className="flex-1 px-4 py-3 text-lg bg-neutral-800 overflow-x-auto font-worksans md:tracking-wide md:text-xl overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-gray hover:scrollbar-thumb-hover-green text-white outline-none resize-none rounded-full transition-all duration-300 ease-in-out overflow-hidden"
				style={{ lineHeight: "24px" }}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

			<button
				className="p-3 text-white focus:outline-none animate-pulse"
				onClick={sendMessage}>
				{text ? <FaPaperPlane /> : <FaMicrophone />}
			</button>
		</div>
	);
};

export default ExpandingTextarea;
