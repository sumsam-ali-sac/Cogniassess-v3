import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
export default function FeedbackBot() {
	return (
		<div className="flex h-screen bg-gray-200">
			{/* <Sidebar /> */}
			<Chat />
		</div>
	);
}
