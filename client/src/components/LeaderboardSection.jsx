import React from "react";
import RankingCard from "./RankingCard";
import { FaRocket } from "react-icons/fa";

const LeaderboardSection = () => (
	<section className="Rankings text-left bg-dark-gray p-10">
		<div className="s-text p-text pb-36 md:p-10 w-full flex flex-col md:flex-row justify-between items-center">
			<div>
				<h1 className="text-4xl font-rubic font-black text-neon-green">
					Leaderboard
				</h1>
				<p className="font-worksans md:tracking-wider text-xl md:text-xl text-white">
					See who's using this site on a regular basis.
				</p>
			</div>
		</div>

		<div className="flex flex-wrap text-center justify-center">
			{/* List of StreakCards with numbers */}
			<RankingCard
				number="1"
				iconName="/Rankings logo.png"
				title="Keepitreal"
				streak="2 DAYS"
			/>
			<RankingCard
				number="2"
				iconName="/Rankings logo.png"
				title="DigiLab"
				streak="6 DAYS"
			/>
			<RankingCard
				number="3"
				iconName="/Rankings logo.png"
				title="GravityOne"
				streak="5 DAYS"
			/>
			<RankingCard
				number="4"
				iconName="/Rankings logo.png"
				title="Juanie"
				streak="7 DAYS"
			/>
			<RankingCard
				number="5"
				iconName="/Rankings logo.png"
				title="BlueWhale"
				streak="2 DAYS"
			/>
			<RankingCard
				number="6"
				iconName="/Rankings logo.png"
				title="Mr Fox"
				streak="6 DAYS"
			/>
			<RankingCard
				number="7"
				iconName="/Rankings logo.png"
				title="Shroomie"
				streak="4 DAYS"
			/>
			<RankingCard
				number="8"
				iconName="/Rankings logo.png"
				title="Robotica"
				streak="2 DAYS"
			/>
			<RankingCard
				number="9"
				iconName="/Rankings logo.png"
				title="RustyRobot"
				streak="3 DAYS"
			/>
			<RankingCard
				number="10"
				iconName="/Rankings logo.png"
				title="Animakid"
				streak="5 DAYS"
			/>
			<RankingCard
				number="11"
				iconName="/Rankings logo.png"
				title="Dotgu"
				streak="3 DAYS"
			/>
			<RankingCard
				number="12"
				iconName="/Rankings logo.png"
				title="Ghiblier"
				streak="7 DAYS"
			/>
			<RankingCard
				number="13"
				iconName="/Rankings logo.png"
				title="RustyRobot"
				streak="3 DAYS"
			/>
			<RankingCard
				number="14"
				iconName="/Rankings logo.png"
				title="Animakid"
				streak="5 DAYS"
			/>

			{/* Continue adding more StreakCards as needed */}
		</div>
	</section>
);

export default LeaderboardSection;
