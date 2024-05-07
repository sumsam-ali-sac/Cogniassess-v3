import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const links = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Settings", path: "/settings" },
		{ name: "Assessment", path: "/assessment" },
		{ name: "Leaderboard", path: "/leaderboard" },
		{ name: "Contact Us", path: "/contact-us" },
	];

	return (
		<div className="flex h-full">
			{/* Overlay that appears when the sidebar is open */}
			{isOpen && (
				<div
					className="bg-black bg-opacity-50 fixed inset-0 z-30"
					onClick={toggleSidebar}></div>
			)}

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out bg-neutral-900 text-white shadow-lg`}>
				<div className="flex items-center justify-between p-4">
					<h2 className="text-xl font-rubic font-black ">
						Dashboard
					</h2>
					<HiChevronDoubleLeft
						className="h-6 w-6 cursor-pointer text-neon-green animate-bounce"
						onClick={toggleSidebar}
					/>
				</div>

				<div className="flex flex-col font-worksans md:tracking-wider justify-between h-full">
					<ul className="space-y-4 p-4">
						{links.map((link) => (
							<li key={link.name}>
								<NavLink
									to={link.path}
									className={({ isActive }) =>
										`block p-2 text-lg transition-colors duration-200 ${
											isActive
												? "text-neon-green"
												: "text-gray-300 hover:text-neon-green"
										}`
									}
									onClick={toggleSidebar}>
									{link.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Button to toggle sidebar */}
			<button
				onClick={toggleSidebar}
				className={`absolute z-50 p-2 m-2 text-neon-green animate-bounce ${
					isOpen ? "hidden" : ""
				}`}>
				<HiChevronDoubleRight className="h-5 w-5" />
			</button>
		</div>
	);
};

export default Sidebar;
