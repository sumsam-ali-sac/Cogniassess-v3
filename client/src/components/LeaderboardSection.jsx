import React, { useState, useEffect } from "react";
import axios from "axios";
import RankingCard from "./RankingCard";

const LeaderboardSection = () => {
	const [leaders, setLeaders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const response = await axios.get(
					"api/node/ranking/leaderboard"
				);
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
		<section className="Rankings text-left bg-dark-gray p-10">
			<div className="s-text p-text pb-36 md:p-10 w-full flex flex-col md:flex-row justify-between items-center">
				<div>
					<h1 className="text-4xl font-rubic font-black text-neon-green">
						Leaderboard
					</h1>
					<p className="font-worksans md:tracking-wider text-xl md:text-xl text-white">
						See who's on top and compete with fellow candidates.
					</p>
				</div>
			</div>
			<div className="flex flex-wrap text-center justify-center">
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p className="text-red-500">Error: {error}</p>
				) : (
					leaders.map((leader, index) => (
						<RankingCard
							key={index}
							ranking={index + 1}
							iconName={leader.avatar}
							title={leader.username}
						/>
					))
				)}
			</div>
		</section>
	);
};

export default LeaderboardSection;
