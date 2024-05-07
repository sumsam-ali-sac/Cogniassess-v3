import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import RolesSection from "../components/RoleSection";
import Features from "../components/Features";
import LeaderboardSection from "../components/LeaderboardSection";
import UpdateSection from "../components/UpdateSection";

const Home = () => {
	return (
		<div>
			<Navbar />
			<HeroSection />
			<RolesSection />
			<Features />
			<LeaderboardSection />
			<UpdateSection />
			<Footer />
		</div>
	);
};

export default Home;
