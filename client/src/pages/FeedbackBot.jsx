import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function FeedbackBot() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-dark-gray">
			<Sidebar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<Chat isSidebarOpen={isSidebarOpen} />
		</div>
	);
}
