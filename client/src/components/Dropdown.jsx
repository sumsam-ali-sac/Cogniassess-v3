import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const Dropdown = ({ options, onSelect, placeholder }) => {
	const [selectedOption, setSelectedOption] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null); // Reference to the dropdown container

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (option) => {
		setSelectedOption(option);
		onSelect(option);
		setIsOpen(false);
	};

	// Effect to add an event listener to the document
	useEffect(() => {
		const handleClickOutside = (event) => {
			// Close dropdown if click is outside of the dropdown element
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="relative inline-block text-left w-full"
			ref={dropdownRef}>
			<div>
				<button
					onClick={toggleDropdown}
					type="button"
					className="flex items-center justify-between w-full bg-white p-3 rounded font-worksans tracking-wider text-black placeholder-gray-400 focus:outline-none">
					{selectedOption || placeholder}

					<svg
						className="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			{isOpen && (
				<div
					className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
					userrole="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1">
					<div className="py-1" userrole="none">
						{options.map((option, index) => (
							<div
								key={index}
								className="text-black font-worksans tracking-wider block px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-gray-900"
								userrole="menuitem"
								tabIndex="-1"
								onClick={() => handleSelect(option)}>
								{option}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
