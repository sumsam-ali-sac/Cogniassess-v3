import React from "react";
import CountUp from "react-countup";

function HeroSection() {
	return (
		<section className="flex flex-col md:flex-row mt-5 items-center justify-center md:justify-between p-10 pb-36 md:p-20 bg-dark-gray">
			<HeroContent />
			<HeroImage />
		</section>
	);
}
function HeroContent() {
	return (
		<div className="w-full md:max-w-1/2 mb-5 md:mb-0 md:order-1 text-left">
			<h1 className="text-4xl md:text-7xl font-rubic font-black text-white mb-5 leading-snug">
				Personalized
				<br /> Non-Technical Roles{" "}
				<span className="text-neon-green">Assessment</span>
			</h1>
			<p className="font-worksans md:tracking-wider text-xl md:text-xl text-white mb-5 leading-relaxed">
				Unlock Your Potential with CogniAssess Tailored Assessments and
				Roadmaps for Diverse Role
			</p>

			<button className="bg-neon-green font-worksans text-black px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg m-1 cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green">
				Explore
			</button>

			<div className="w-full md:w-auto font-worksans text-white py-4 mt-5 md:mt-0">
				<div className="flex justify-center space-x-4 bg-dark-gray">
					<div className="text-center mx-4 md:mx-6">
						<span className="text-2xl md:text-3xl font-rubic font-black">
							<CountUp end={5} duration={2.75} />
						</span>
						<div className="md:tracking-wider text-xl md:text-xl font-worksans mt-2">
							Roles
						</div>
					</div>
					<div className="text-center mx-4 md:mx-6">
						<span className="text-2xl md:text-3xl font-rubic font-black">
							<CountUp end={20} duration={2.75} suffix="+" />
						</span>
						<div className="md:tracking-wider text-xl md:text-xl font-worksans mt-2">
							Domains
						</div>
					</div>
					<div className="text-center mx-4 md:mx-6">
						<span className="text-2xl md:text-3xl font-rubic font-black">
							<CountUp end={360} duration={2.75} />
						</span>
						<div className="md:tracking-wider text-xl md:text-xl font-worksans mt-2">
							Feedback
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function HeroImage() {
	return (
		<div className="w-full md:max-w-1/2 md:order-2 text-center">
			<div className="inline-block border-2 border-gray-700 rounded-2xl">
				<img
					className="w-auto h-auto rounded-t-2xl transition-transform duration-300 cursor-pointer hover:scale-105"
					src="/hero section robot.png"
					alt="Fine"
				/>
				<div className="text-white text-lg bg-dark-gray rounded-b-2xl text-left p-5 mt-[-9px] font-rubic">
					Fine-Tuned Zephyr Beta 7B Model
				</div>
			</div>
		</div>
	);
}

export default HeroSection;
