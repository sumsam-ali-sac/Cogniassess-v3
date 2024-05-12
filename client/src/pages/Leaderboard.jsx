import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Leaderboard() {
	const [leaders, setLeaders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const response = await axios.get(
					"api/node/ranking/leaderboard"
				);
				console.log(response.data);
				setLeaders(response.data);
			} catch (error) {
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
		<div>
			<Navbar />
			<div className="container mt-16 bg-dark-gray mx-auto px-4 py-6">
				<h1 className="text-3xl font-black font-rubic text-neon-green text-center mb-6">
					Leaderboard
				</h1>
				{isLoading ? (
					<p className="text-center">Loading...</p>
				) : error ? (
					<p className="text-center text-red-500">Error: {error}</p>
				) : (
					<div className="max-w-2xl mx-auto bg-neutral-900 font-worksans shadow overflow-hidden sm:rounded-lg">
						<ul className="divide-y divide-neon-green">
							{leaders.map((leader, index) => (
								<li
									key={index}
									className="px-4 py-4 sm:px-6 border-b border-neon-green  hover:bg-neutral-700 transform transition duration-300 hover:scale-105">
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<span className="text-neon-green text-lg font-bold mr-3">
												{index + 1}.
											</span>
											<img
												src={leader.avatar}
												alt="avatar"
												className="h-10 w-10 rounded-full mr-4"
											/>
											<p className="text-lg font-medium text-off-white truncate">
												{leader.username}
											</p>
										</div>
										<div className="ml-2 flex-shrink-0 flex">
											<p className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
			<Footer />
		</div>
	);
}

export default Leaderboard;
