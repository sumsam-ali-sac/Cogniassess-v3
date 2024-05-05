import React from "react";
import { FaCommentAlt, FaQuestionCircle, FaBolt } from "react-icons/fa";
import ChatButton from "./Chatbutton";

const ChatButtonsPanel = ({ onButtonClick }) => {
	return (
		<div className="flex flex-col items-center justify-center flex-grow">
			<h1 className="text-4xl font-rubic font-black mb-10 text-neon-green animate-pulse bg-gradient-to-r from-neon-green from-10%  via-amber-500 via-30% to-neon-green to-90%  inline-block text-transparent bg-clip-text">
				Hello, coding
			</h1>
			<p className="text-2xl font-worksans md:tracking-wide md:text-xl mb-5">
				Want some feedback?
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
				<ChatButton
					text="Guide me where I did any mistake during the assessment"
					icon={<FaCommentAlt className="text-neon-green h-6 w-6" />}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Provide tips for improving my skills and improve performance"
					icon={
						<FaQuestionCircle className="text-neon-green h-6 w-6" />
					}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Suggest resources to better understand the topic"
					icon={<FaBolt className="text-neon-green h-6 w-6" />}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Guide me on how to apply this knowledge effectively"
					icon={<FaCommentAlt className="text-neon-green h-6 w-6" />}
					onClick={onButtonClick}
				/>
			</div>
		</div>
	);
};

export default ChatButtonsPanel;
