import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "/logo.png";
import UserMenu from "./UserMenu";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const user = useSelector((state) => state.user.user);

	const toggleNavbar = () => {
		setIsOpen(!isOpen);
	};

	const shouldShowLink = (path) => location.pathname !== path && !user;

	return (
		<div className="bg-dark-gray p-3.5 fixed top-0 left-0 right-0 z-50 w-full">
			<div className="flex justify-between items-center w-full">
				<Link to="/">
					<div className="flex items-center text-xl font-rubic font-black">
						<img src={logo} alt="Logo" className="mr-3 h-10" />
						<span className="text-neon-green">COGNI</span>
						<span className="text-white">ASSESS</span>
					</div>
				</Link>

				<div className="lg:hidden">
					<button
						onClick={toggleNavbar}
						className="text-white text-xl transition-opacity duration-300 ">
						{isOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				<div
					className={`${
						isOpen ? "flex" : "hidden"
					} lg:flex flex-col lg:flex-row items-center font-worksans tracking-wider text-base absolute lg:relative top-full left-0 right-0 lg:right-auto w-full lg:w-auto bg-dark-gray lg:bg-transparent transition-all duration-1000 ease-in-out`}>
					<Link
						to="/"
						className="text-white mr-3 py-3 px-4 hover:text-neon-green transition-colors">
						Assessment
					</Link>
					<Link
						to="/about"
						className="text-white mr-3 py-3 px-4 hover:text-neon-green transition-colors">
						About Us
					</Link>
					<Link
						to="/contact-us"
						className="text-white mr-3 py-3 px-4 hover:text-neon-green transition-colors">
						Contact Us
					</Link>
					<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
						{user ? (
							<UserMenu user={user} />
						) : (
							<>
								{shouldShowLink("/sign-up") && (
									<Link
										to="/sign-up"
										className="flex items-center justify-center bg-neon-green text-black py-3 px-4 rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green lg:mr-6 my-2 lg:my-0 w-full lg:w-auto min-w-[100px]">
										<FaUserPlus className="mr-3" />
										<span>Sign Up</span>
									</Link>
								)}
								{shouldShowLink("/sign-in") && (
									<Link
										to="/sign-in"
										className="flex items-center justify-center bg-neon-green text-black py-3 px-4 rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green my-2 lg:my-0 w-full lg:w-auto min-w-[100px]">
										<FaSignInAlt className="mr-3" />
										<span>Sign In</span>
									</Link>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
