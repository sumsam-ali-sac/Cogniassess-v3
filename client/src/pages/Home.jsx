import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import RolesSection from "../components/RoleSection";
import Features from "../components/Features";
import StreaksSection from "../components/StreaksSection";
import UpdateSection from "../components/UpdateSection";

const Home = () => {
	return (
		<div>
			<Navbar />
			<HeroSection />
			<RolesSection />
			<Features />
			<StreaksSection />
			<UpdateSection />
			<Footer />
		</div>
	);
};

export default Home;
