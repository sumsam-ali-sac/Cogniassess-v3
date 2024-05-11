import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";
import { persistor } from "../redux/store.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserMenu({ user }) {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const menuRef = useRef();

	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuRef]);

	const handleLogout = () => {
		dispatch(logoutUser());
		persistor.purge();
		navigate("/");
	};

	return (
		<div className="relative" ref={menuRef}>
			<button
				onClick={toggleDropdown}
				className="flex items-center bg-transparent border-none">
				<img
					src={user.avatar}
					alt="User"
					className="h-10 w-10 rounded-full mr-2"
				/>
			</button>
			<div
				className={`absolute right-0 mt-2 w-36 bg-neutral-700 rounded-lg shadow-lg py-1 z-50 transition-opacity duration-300 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}>
				<Link
					to="/settings"
					className="block px-4 py-2 text-white font-worksans tracking-wider text-base hover:bg-neutral-800 hover:text-neon-green  w-full text-left">
					<FaCog className="inline mr-2" />
					<span>Settings</span>
				</Link>

				<button
					onClick={handleLogout}
					className="block px-4 py-2 text-white font-worksans tracking-wider text-base hover:bg-neutral-800  hover:text-neon-green w-full text-left">
					<FaSignOutAlt className="inline mr-2" />
					Log Out
				</button>
			</div>
		</div>
	);
}

export default UserMenu;
