import React from "react";
import StreakCard from "./StreakCard";
import { FaRocket } from "react-icons/fa";

const StreaksSection = () => (
	<section className="streaks text-left bg-dark-gray p-10">
		<div className="s-text p-text pb-36 md:p-10 w-full flex flex-col md:flex-row justify-between items-center">
			<div>
				<h1 className="text-4xl font-rubic font-black text-neon-green">
					Top Streaks
				</h1>
				<p className="font-worksans md:tracking-wider text-xl md:text-xl text-white">
					See who's using this site on a regular basis.
				</p>
			</div>
			<a
				href="register.html"
				className="bg-neon-green inline-flex items-center font-worksans text-black px-4 py-2 md:px-6 md:py-4 text-sm md:text-l m-1 cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green">
				<FaRocket className="mr-3" /> Join us now
			</a>
		</div>

		<div className="flex flex-wrap text-center justify-center">
			{/* List of StreakCards with numbers */}
			<StreakCard
				number="1"
				iconName="/Streaks logo.png"
				title="Keepitreal"
				streak="2 DAYS"
			/>
			<StreakCard
				number="2"
				iconName="/Streaks logo.png"
				title="DigiLab"
				streak="6 DAYS"
			/>
			<StreakCard
				number="3"
				iconName="/Streaks logo.png"
				title="GravityOne"
				streak="5 DAYS"
			/>
			<StreakCard
				number="4"
				iconName="/Streaks logo.png"
				title="Juanie"
				streak="7 DAYS"
			/>
			<StreakCard
				number="5"
				iconName="/Streaks logo.png"
				title="BlueWhale"
				streak="2 DAYS"
			/>
			<StreakCard
				number="6"
				iconName="/Streaks logo.png"
				title="Mr Fox"
				streak="6 DAYS"
			/>
			<StreakCard
				number="7"
				iconName="/Streaks logo.png"
				title="Shroomie"
				streak="4 DAYS"
			/>
			<StreakCard
				number="8"
				iconName="/Streaks logo.png"
				title="Robotica"
				streak="2 DAYS"
			/>
			<StreakCard
				number="9"
				iconName="/Streaks logo.png"
				title="RustyRobot"
				streak="3 DAYS"
			/>
			<StreakCard
				number="10"
				iconName="/Streaks logo.png"
				title="Animakid"
				streak="5 DAYS"
			/>
			<StreakCard
				number="11"
				iconName="/Streaks logo.png"
				title="Dotgu"
				streak="3 DAYS"
			/>
			<StreakCard
				number="12"
				iconName="/Streaks logo.png"
				title="Ghiblier"
				streak="7 DAYS"
			/>
			<StreakCard
				number="13"
				iconName="/Streaks logo.png"
				title="RustyRobot"
				streak="3 DAYS"
			/>
			<StreakCard
				number="14"
				iconName="/Streaks logo.png"
				title="Animakid"
				streak="5 DAYS"
			/>

			{/* Continue adding more StreakCards as needed */}
		</div>
	</section>
);

export default StreaksSection;
