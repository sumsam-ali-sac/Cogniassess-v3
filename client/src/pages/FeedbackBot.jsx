import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatContent from "../components/ChatContent";
import SideNav from "../components/Sidenav";
import ChatInput from "../components/ChatInput";
export default function FeedbackBot() {
	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Navbar />
			<div className="flex">
				<SideNav />
				<ChatContent />
			</div>
			<ChatInput />
			<Footer />
		</div>
	);
}
