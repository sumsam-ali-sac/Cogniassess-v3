import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

function Leaderboard() {
	const [leaders, setLeaders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				// Use axios to make the HTTP request
				const response = await axios.get(
					"api/node/ranking/leaderboard"
				);
				console.log(response.data);
				setLeaders(response.data);
			} catch (error) {
				// Update to handle errors from axios
				setError(
					error.response ? error.response.data.message : error.message
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLeaderboard();
	}, []);

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold text-center mb-6">Leaderboard</h1>
			{isLoading ? (
				<p className="text-center">Loading...</p>
			) : error ? (
				<p className="text-center text-red-500">Error: {error}</p>
			) : (
				<div className="max-w-2xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
					<ul>
						{leaders.map((leader, index) => (
							<li
								key={index}
								className="px-4 py-4 sm:px-6 border-b border-gray-200">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-gray-900 truncate">
										{leader.username}
									</p>
									<div className="ml-2 flex-shrink-0 flex">
										<p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
											Score: {leader.rankScore}
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Leaderboard;
