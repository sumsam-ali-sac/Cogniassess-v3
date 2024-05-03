import React from "react";

const Feature = ({ iconName, title }) => (
	<div className="proctor-card hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer rounded-lg text-white m-3 p-5">
		<div className="proctor-icon mb-2flex justify-center">
			<img
				className="object-cover rounded-full h-50 w-50" // fixed size for images
				src={iconName}
				alt={title}
			/>
		</div>
		<div className="p-5 proctor-title text-2xl font-worksans font-bold">
			{title}
		</div>
	</div>
);

const Features = () => (
	<section className="proctoring text-center bg-dark-gray p-10">
		<div className="p-text pb-36 md:p-10 w-full md:w-5/6">
			<h1 className="text-left text-4xl font-rubic font-black text-neon-green mb-2">
				Real Time <span className="text-white">Proctoring</span>
			</h1>
			<p className="text-left font-worksans md:tracking-wider text-xl md:text-xl text-white">
				Real-time proctoring in CogniAssess ensures integrity and
				credibility in online assessments through advanced, live
				monitoring.
			</p>
		</div>
		<div className="flex flex-col md:flex-row justify-center items-center md:flex-wrap overflow-auto">
			<Feature
				iconName="/Facial Capture 2.png"
				title="Face Movement Tracking"
			/>
			<Feature
				iconName="/Proctoring Laptop.jpg"
				title="Browser Lockdown"
			/>
			<Feature iconName="/Chat Feature.jpg" title="Screen Recording" />
		</div>
	</section>
);

export default Features;
