import React, { useState } from "react";
import { FaBell, FaCreditCard, FaUsers, FaPuzzlePiece } from "react-icons/fa";

function SettingsPage() {
	// State for form fields
	const [userDetails, setUserDetails] = useState({
		firstName: "Jane",
		lastName: "Smith",
		email: "jane@example.com",
		username: "janesmith",
		avatar: "/path-to-avatar.jpg",
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
			{/* Sidebar for navigation tabs */}
			<aside className="font-worksans tracking-wider w-full md:w-1/5 bg-neutral-800 text-white p-5 space-y-6">
				<div className=" text-lg font-semibold">Account</div>
				<div className="flex items-center space-x-2 text-white cursor-pointer hover:text-neon-green">
					<FaBell />
					<span>Notifications</span>
				</div>
				<div className="flex items-center space-x-2 text-white cursor-pointer hover:text-neon-green">
					<FaCreditCard />
					<span>Billing</span>
				</div>
				<div className="flex items-center space-x-2 text-white cursor-pointer hover:text-neon-green">
					<FaUsers />
					<span>Teams</span>
				</div>
				<div className="flex items-center space-x-2 text-white cursor-pointer hover:text-neon-green">
					<FaPuzzlePiece />
					<span>Integrations</span>
				</div>
			</aside>

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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<input
										type="text"
										name="firstName"
										value={userDetails.firstName}
										onChange={handleInputChange}
										placeholder="First name"
										className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
									/>
									<input
										type="text"
										name="lastName"
										value={userDetails.lastName}
										onChange={handleInputChange}
										placeholder="Last name"
										className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
									/>
								</div>
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

					{/* Log Out Other Sessions Section */}
					<div className="bg-neutral-800 p-4 md:p-6 mb-8  rounded-lg">
						<h2 className="text-neon-green font-rubic font-black text-2xl mb-5">
							Log Out Other Sessions
						</h2>
						<p className="text-gray-400 font-worksans tracking-wider text-l mb-6">
							Please enter your password to confirm you would like
							to log out of all other sessions.
						</p>
						<input
							type="password"
							name="confirmLogoutPassword"
							value={userDetails.confirmLogoutPassword}
							onChange={handleInputChange}
							placeholder="Your password"
							className="bg-neutral-700 text-neutral-300 p-3 rounded w-full"
						/>
						<button
							type="submit"
							className="font-worksans tracking-wider text-l bg-neon-green text-black px-6 py-2 transition-colors border-2 border-neon-green rounded hover:bg-dark-gray hover:text-neon-green  mt-6">
							Log out other sessions
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
