import React from "react";

const SideNav = () => {
	return (
		<div className="w-64 bg-gray-800 text-gray-400 p-4 rounded-xl">
			<form className="mb-5">
				<select className="w-full p-2 bg-gray-700 text-white rounded-md">
					<option>Cogni Assess v1</option>
					<option>Cogni Assess v2</option>
					<option>Cogni Assess v3</option>
					<option>Cogni Assess v4</option>
				</select>
			</form>
			<div className="flex flex-col">
				<a href="#" className="my-2">
					My Account
				</a>
				<a href="#" className="my-2">
					View Ranking
				</a>
				<a href="./login.html" className="my-2">
					Log Out
				</a>
			</div>
		</div>
	);
};

export default SideNav;
