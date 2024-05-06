import React, { useState, useRef, useEffect } from "react";
import ChatButtonsPanel from "./ChatButtonsPanel";
import ChatDisplay from "./ChatDisplay";
import ExpandingTextarea from "./ExpandingTextArea";

const Chat = ({ isSidebarOpen }) => {
	const [chatActive, setChatActive] = useState(false);
	const [messages, setMessages] = useState([]);
	const endOfMessagesRef = useRef(null);
	const socketRef = useRef(null);

	useEffect(() => {
		// Establish WebSocket connection
		socketRef.current = new WebSocket("ws://localhost:3000");
		socketRef.current.onmessage = (event) => {
			handleBotResponse(event.data);
		};

		// Clean up WebSocket connection when component unmounts
		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, []);

	const handleBotResponse = (messageText) => {
		setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "bot" }]);
		scrollToBottom();
	};

	const handleUserMessage = (messageText) => {
		if (!chatActive) setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
		scrollToBottom();
		// Send message to WebSocket server
		if (socketRef.current) {
			socketRef.current.send(messageText);
		}
	};

	const scrollToBottom = () => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div
			className={`bg-dark-gray text-white min-h-screen w-full flex flex-col items-center justify-between p-4 ${
				isSidebarOpen ? "opacity-50 pointer-events-none" : ""
			}`}>
			{!chatActive ? (
				<>
					<ChatButtonsPanel onButtonClick={handleBotResponse} />
					<ExpandingTextarea onSend={handleUserMessage} />
				</>
			) : (
				<>
					<ChatDisplay
						messages={messages}
						endRef={endOfMessagesRef}
					/>
					<ExpandingTextarea onSend={handleUserMessage} />
				</>
			)}
		</div>
	);
};

export default Chat;
