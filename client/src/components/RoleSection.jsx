import React, { useEffect, useState } from "react";
import RoleCard from "./Rolecard";

function RolesSection() {
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await fetch("/api/node/roles");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setRoles(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching roles:", error);
				console.log(error.message);
				setError(error.message);
				setLoading(false);
			}
		};

		fetchRoles();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<section className="bg-dark-gray p-10 pb-36 pt-14 md:p-20">
			<div className="text-left mb-10">
				<h1 className="text-4xl font-rubic font-black text-neon-green">
					Roles To Choose From
				</h1>
				<p className="font-worksans md:tracking-wider text-xl md:text-xl text-white mt-2">
					Here is a list of roles you can choose from to get
					personalized assessment
				</p>
			</div>
			<div className="flex flex-wrap justify-center items-stretch">
				{roles.map((role) => (
					<RoleCard
						key={role._id}
						roleName={role.RoleName}
						iconName={role.iconPath} // Now dynamically pulling from the API
						title={role.RoleName}
						description={role.RoleDescription}
					/>
				))}
			</div>
		</section>
	);
}

export default RolesSection;
