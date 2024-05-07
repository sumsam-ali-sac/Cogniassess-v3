import React from "react";
import { useNavigate } from "react-router-dom";

function RoleCard({ roleName, iconName, title, description }) {
	const navigate = useNavigate();

	const handleRoleSelect = () => {
		navigate(`/domain-selection/${roleName}`);
	};

	return (
		<div
			onClick={handleRoleSelect}
			className="bg-neutral-700 rounded-lg  text-white p-5 m-3 box-border transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 flex flex-col items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
			<div className="role-icon mb-4">
				<img className="h-auto rounded-lg" src={iconName} alt={title} />
			</div>
			<div className="role-title text-center text-2xl font-bold mb-3 font-worksans">
				{title}
			</div>
			<div className="role-description text-left  text-lg font-worksans">
				{description}
			</div>
		</div>
	);
}

export default RoleCard;
