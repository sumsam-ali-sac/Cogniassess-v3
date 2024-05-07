import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
function SettingsPage() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const user = useSelector((state) => state.user.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user, navigate]);
	const [userDetails, setUserDetails] = useState({
		email: user.email,
		username: user.username,
		avatar: user.avatar,
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	// Handler for form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prevState) => ({ ...prevState, [name]: value }));
	};

	// Handler for form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// Submit logic goes here
	};

	return (
		<div className="flex flex-col md:flex-row bg-dark-gray text-white">
			<Sidebar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<main className="flex-1 p-4 md:p-8">
				<div className="max-w-4xl mx-auto">
					{/* Personal Information Section */}
					<form
						onSubmit={handleSubmit}
						className="bg-neutral-800 p-4 md:p-6 mb-8 rounded-lg">
						<h2 className="text-neon-green font-rubic font-black text-2xl mb-5">
							Personal Information
						</h2>
						<div className=" font-worksans tracking-wider flex flex-col md:flex-row items-center space-x-0 md:space-x-8 mb-6">
							{/* Avatar */}
							<div className="mb-4 md:mb-0">
								<img
									src={userDetails.avatar}
									alt="User Avatar"
									className="rounded-full w-24 h-24"
								/>
								<button
									type="button"
									className="text-neon-green hover:text-dark-gray text-sm mt-2">
									Change avatar
								</button>
								<p className="text-white text-xs">
									JPG, GIF, or PNG. 1MB max.
								</p>
							</div>

							{/* Form Fields */}
							<div className=" font-worksans tracking-wider text-l flex-1  rounded-lg">
								<input
									type="email"
									name="email"
									value={userDetails.email}
									onChange={handleInputChange}
									placeholder="Email address"
									className="bg-neutral-700 text-neutral-300 p-3 rounded w-full mt-6"
								/>
								<div className="mt-6">
									<input
										type="text"
										name="username"
										value={userDetails.username}
										onChange={handleInputChange}
										placeholder="Username"
										className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
										disabled
									/>
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="font-worksans tracking-wider text-l bg-neon-green text-black px-6 py-2 transition-colors border-2 border-neon-green rounded hover:bg-dark-gray hover:text-neon-green ">
							Save
						</button>
					</form>

					<div className="bg-neutral-800 p-4 md:p-6 mb-8  rounded-lg">
						<h2 className="text-neon-green font-rubic font-black text-2xl mb-5">
							Change Password
						</h2>
						<div className="font-worksans tracking-wider text-l grid grid-cols-1 gap-6">
							<input
								type="password"
								name="currentPassword"
								value={userDetails.currentPassword}
								onChange={handleInputChange}
								placeholder="Current password"
								className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
							/>
							<input
								type="password"
								name="newPassword"
								value={userDetails.newPassword}
								onChange={handleInputChange}
								placeholder="New password"
								className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
							/>
							<input
								type="password"
								name="confirmNewPassword"
								value={userDetails.confirmNewPassword}
								onChange={handleInputChange}
								placeholder="Confirm new password"
								className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
							/>
						</div>
						<button
							type="submit"
							className="font-worksans tracking-wider text-l bg-neon-green text-black px-6 py-2 transition-colors border-2 border-neon-green rounded hover:bg-dark-gray hover:text-neon-green  mt-6">
							Save
						</button>
					</div>

					{/* Delete Account Section */}
					<div className="bg-neutral-800 p-4 md:p-6  rounded-lg">
						<h2 className="text-neon-green font-rubic font-black text-2xl mb-5">
							Delete Account
						</h2>
						<p className="font-worksans tracking-wider text-l text-gray-400 mb-6">
							No longer want to use our service? You can delete
							your account here. This action is not reversible.
							All information related to this account will be
							deleted permanently.
						</p>
						<button
							type="button"
							className="font-worksans tracking-wider text-l bg-red-600 px-6 py-2 transition-colors rounded hover:bg-red-800">
							Yes, delete my account
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default SettingsPage;
