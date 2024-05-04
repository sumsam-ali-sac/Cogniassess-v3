import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";

const Chat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (!isOpen) return;
		setTimeout(() => {
			setMessages([
				{
					id: Date.now(),
					text: "How can I help you today?",
					sender: "bot",
				},
			]);
		}, 1000);
	}, [isOpen]);

	const handleSend = () => {
		if (input.trim() === "") return;

		const newMessage = { id: Date.now(), text: input, sender: "user" };
		setMessages([...messages, newMessage]);
		setInput("");

		setTimeout(() => {
			setMessages((currentMessages) => [
				...currentMessages,
				{
					id: Date.now(),
					text: "Here's a thoughtful response from the bot!",
					sender: "bot",
				},
			]);
		}, 1500);
	};

	return (
		<div
			className={`fixed bottom-4 right-4 ${
				isOpen ? "w-80 md:w-96" : "w-16 h-16"
			} h-auto bg-white rounded-lg shadow-lg transition-all duration-300 flex flex-col overflow-hidden`}>
			<button
				className={`absolute top-2 right-2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white ${
					isOpen ? "" : "hidden"
				}`}
				onClick={() => setIsOpen(false)}>
				<span className="text-xl">-</span>
			</button>
			<button
				className={`w-full h-full flex items-center justify-center text-white text-3xl p-3 bg-blue-500 hover:bg-blue-600 transition duration-300 rounded-t-lg ${
					isOpen ? "hidden" : "flex"
				}`}
				onClick={() => setIsOpen(true)}>
				<BsChatDots />
			</button>
			{isOpen && (
				<>
					<div className="p-4 bg-blue-100 text-lg font-semibold flex items-center justify-between">
						<h2>Chat with us!</h2>
						<img
							src="logo.png"
							alt="Logo"
							className="w-10 h-10 rounded-full"
						/>
					</div>
					<div className="flex-1 p-2 overflow-y-auto">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex my-2 ${
									message.sender === "user"
										? "justify-end"
										: "justify-start"
								}`}>
								<div
									className={`max-w-xs px-4 py-2 rounded-lg shadow ${
										message.sender === "user"
											? "bg-blue-400 text-white"
											: "bg-green-200 text-gray-800"
									}`}>
									{message.text}
								</div>
							</div>
						))}
					</div>
					<div className="p-3 bg-gray-100 flex items-center">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your message here..."
							className="flex-1 p-2 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
						/>
						<button
							onClick={handleSend}
							className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg transition duration-300">
							<AiOutlineSend />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
