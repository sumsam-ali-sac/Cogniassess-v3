import React, { memo } from "react";

const Message = memo(({ msg }) => {
	return (
		<div
			className={`flex items-center p-4 ${
				msg.sender === "user" ? "justify-end" : ""
			}`}>
			{msg.sender !== "user" && (
				<img
					src="/logo.png"
					alt="Bot"
					className="w-13 h-10 rounded-full mr-3"
				/>
			)}
			<div
				className={`p-4 rounded-lg ${
					msg.sender === "user"
						? "bg-neon-green text-neutral-700 text-right"
						: "bg-neutral-700 text-white text-left"
				}`}>
				<div className="font-worksans md:tracking whitespace-pre-wrap md:text-lg">
					{msg.text}
				</div>
			</div>
			{msg.sender === "user" && (
				<img
					src="/Streaks logo.png"
					alt="User"
					className="w-10 h-10 rounded-full ml-3"
				/>
			)}
		</div>
	);
});

const ChatDisplay = memo(({ messages, endRef }) => {
	const messageElements = React.useMemo(
		() => messages.map((msg, index) => <Message key={index} msg={msg} />),
		[messages]
	);

	return (
		<div className="w-full h-full mb-24 bg-dark-gray overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-gray hover:scrollbar-thumb-hover-green">
			<div className="bg-dark-gray h-screen">
				{messageElements}
				<div ref={endRef} />
			</div>
		</div>
	);
});

export default ChatDisplay;
