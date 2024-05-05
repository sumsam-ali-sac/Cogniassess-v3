import React, { useState } from "react";
import ChatButtonsPanel from "./ChatButtonsPanel";
import ChatDisplay from "./ChatDisplay";
import ExpandingTextarea from "./ExpandingTextArea";
const Chat = ({ isSidebarOpen }) => {
	const [chatActive, setChatActive] = useState(false);
	const [messages, setMessages] = useState([]);

	const handleChatButtonClick = (messageText) => {
		setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "bot" }]);
	};

	const handleMessageSend = (messageText) => {
		if (!chatActive) setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
		// Add bot response here if needed
	};

	return (
		<div
			className={`bg-dark-gray text-white min-h-screen w-full flex flex-col items-center justify-between p-4 ${
				isSidebarOpen ? "opacity-50 pointer-events-none" : ""
			}`}>
			{!chatActive ? (
				<>
					<ChatButtonsPanel onButtonClick={handleChatButtonClick} />
					<ExpandingTextarea onSend={handleMessageSend} />
				</>
			) : (
				<>
					<ChatDisplay messages={messages} />
					<ExpandingTextarea onSend={handleMessageSend} />
				</>
			)}
		</div>
	);
};

export default Chat;
