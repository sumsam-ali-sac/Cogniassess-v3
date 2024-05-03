import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../redux/user/userSlice";
import { RiUserLine } from "react-icons/ri";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Oauth from "../components/Oauth";

const SignUp = () => {
	const [formData, setFormData] = useState({});
	const [passwordError, setPasswordError] = useState("");
	const { isLoading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSelectRole = (userRole) => {
		setFormData({
			...formData,
			userRole,
		});
	};

	const validatePasswords = () => {
		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match.");
			return false;
		}
		if (!/(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})/.test(formData.password)) {
			setPasswordError(
				"Password must be at least 8 characters long and include at least one number and one letter."
			);
			return false;
		}
		setPasswordError("");
		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!validatePasswords()) {
			toast.error(passwordError, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				className:
					"bg-white font-rubic font-bold p-4 rounded-lg shadow-lg",
				progressClassName: "bg-neon-green h-2",
			});
			return;
		}
		try {
			await dispatch(signUpUser(formData)).unwrap();
			navigate("/sign-in");
		} catch (err) {
			toast.error(err, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				className:
					"bg-white font-rubic font-bold p-4 rounded-lg shadow-lg",
				progressClassName: "bg-neon-green h-2",
			});
		}
	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center justify-center min-h-screen bg-dark-gray px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto">
					<div className="mt-4 md:w-1/2 flex justify-center md:mb-0">
						<img
							src="/auth_image.png"
							alt="Signup Image"
							className="p-6 w-full h-auto max-w-md"
						/>
					</div>
					<div className="mt-10 md:w-1/2 flex justify-center">
						<div className="bg-dark-gray p-8 w-full max-w-1/2 self-center">
							<h2 className="text-4xl font-rubic font-black text-neon-green mb-4">
								Create Account
							</h2>
							<p className="font-worksans tracking-wider text-l text-white mb-6">
								Welcome! Enter your details and start assessing
								yourself.
							</p>
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="flex items-center bg-white p-3 rounded">
									<RiUserLine className="text-gray-400 mr-2" />
									<input
										type="text"
										placeholder="Username"
										id="username"
										required
										onChange={handleChange}
										className="w-full bg-white font-worksans tracking-wider text-black placeholder-gray-400"
									/>
								</div>
								<div className="flex items-center bg-white p-3 rounded">
									<AiOutlineMail className="text-gray-400 mr-2" />
									<input
										type="email"
										placeholder="Email Address"
										id="email"
										required
										onChange={handleChange}
										className="w-full bg-white font-worksans tracking-wider text-black placeholder-gray-400"
									/>
								</div>
								<div className="flex items-center bg-white p-3 rounded">
									<AiOutlineLock className="text-gray-400 mr-2" />
									<input
										type="password"
										placeholder="Password"
										id="password"
										required
										onChange={handleChange}
										className="w-full bg-white font-worksans tracking-wider text-black placeholder-gray-400"
									/>
								</div>
								<div className="flex items-center bg-white p-3 rounded">
									<AiOutlineLock className="text-gray-400 mr-2" />
									<input
										type="password"
										placeholder="Confirm Password"
										id="confirmPassword"
										required
										onChange={handleChange}
										className="w-full bg-white font-worksans tracking-wider text-black placeholder-gray-400"
									/>
								</div>
								<Dropdown
									options={["Candidate", "Recruiter"]}
									onSelect={handleSelectRole}
									placeholder="Select your role"
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="w-1/2 p-3 rounded font-worksans tracking-wider text-l bg-neon-green text-black rounded-r-md transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green">
									{isLoading
										? "Creating account..."
										: "Create account"}
								</button>
								<Oauth mode="signup" />
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
			<ToastContainer />
		</div>
	);
};

export default SignUp;
