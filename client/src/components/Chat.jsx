import React, { useState, useRef, useEffect } from "react";
import ChatButtonsPanel from "./ChatButtonsPanel";
import ChatDisplay from "./ChatDisplay";
import ExpandingTextarea from "./ExpandingTextArea";
import { useSelector, useDispatch } from "react-redux";

const Chat = ({ isSidebarOpen }) => {
	const [chatActive, setChatActive] = useState(false);
	const [messages, setMessages] = useState([]);
	const [userAssessmentContext, setuserAssessmentContext] = useState("");

	const endOfMessagesRef = useRef(null);
	const socketRef = useRef(null);
	const questions = useSelector((state) => state.questions);
	const user = useSelector((state) => state.user.user);

	let all_questions = "";
	questions.forEach((entry) => {
		const { progress, status, ...filteredData } = entry;
		filteredData.questions = filteredData.questions.map(
			({ id, solved, text: question, ...rest }) => ({
				question,
				...rest,
			})
		);
		const str = JSON.stringify(filteredData);
		all_questions = all_questions + str;
	});

	if (all_questions !== "") {
		setuserAssessmentContext(`The user has given the following assessment after selecting the non-technical role and its subdomain 
		the assessment contains both questions and the respective given answers: ${all_questions}`);
	}

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
		setMessages((prev) => {
			const lastMessage = prev[prev.length - 1];
			if (lastMessage && lastMessage.sender === "bot") {
				// Append the new text to the existing message
				return prev.slice(0, -1).concat({
					...lastMessage,
					text: `${lastMessage.text}${messageText}`,
				});
			}
			return [...prev, { text: messageText, sender: "bot" }];
		});
		scrollToBottom();
	};

	const handleUserMessage = (messageText) => {
		if (!chatActive) setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
		scrollToBottom();
		// Send message to WebSocket server
		console.log(userAssessmentContext);
		if (socketRef.current) {
			socketRef.current.send(
				messageText + " CONTEXT " + userAssessmentContext
			);
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
					<ChatButtonsPanel
						user={user}
						onButtonClick={handleUserMessage}
					/>
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
