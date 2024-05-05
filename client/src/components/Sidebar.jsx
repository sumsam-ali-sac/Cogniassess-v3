import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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

				<div className="flex flex-col font-worksans md:tracking-wider  justify-between h-full">
					{/* Main Menu or Navigation */}
					<div>
						<h3 className="px-4 py-2 text-sm font-semibold text-gray-400">
							Previous Chats
						</h3>
						<ul className="space-y-2">
							<li className="px-4 py-2 hover:bg-neutral-700 rounded">
								Chat with John
							</li>
							<li className="px-4 py-2 hover:bg-neutral-700 rounded">
								Chat with Clara
							</li>
							<li className="px-4 py-2 hover:bg-neutral-700 rounded">
								Project Discussion
							</li>
						</ul>
					</div>

					{/* Bottom Links */}
					<div className="mt-auto mb-16 font-worksans md:tracking-wider  ">
						<ul className="space-y-2">
							<li className="px-4 py-2 hover:bg-neutral-700 rounded cursor-pointer">
								Go to Homepage
							</li>
							<li className="px-4 py-2 hover:bg-neutral-700 rounded cursor-pointer">
								Logout
							</li>
						</ul>
					</div>
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
