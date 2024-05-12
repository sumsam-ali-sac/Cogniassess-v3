import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accordion from "../components/Accordion";
const Section = ({ id, title, content, image, video }) => {
	const controls = useAnimation();
	const { ref, inView } = useInView();

	React.useEffect(() => {
		if (inView) {
			controls.start("visible");
		} else {
			controls.start("hidden");
		}
	}, [controls, inView]);

	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={variants}
			transition={{ duration: 0.8 }}
			className="grid grid-cols-1 md:grid-cols-2 bg-neutral-700  shadow-lg rounded-lg p-6 m-6 overflow-hidden"
			id={id}>
			<div>
				<h2 className="text-2xl font-rubic font-black text-neon-green">
					{title}
				</h2>
				<p className="mt-4 text-xl font-worksans text-off-white">
					{content}
				</p>
			</div>
			<div>
				{image && (
					<motion.img
						src={image}
						alt={title}
						className="mt-4 rounded-lg w-full"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.5 }}
					/>
				)}
				{video && (
					<motion.video
						src={video}
						controls
						className="mt-4 w-full"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.5 }}
					/>
				)}
			</div>
		</motion.div>
	);
};

const About = () => {
	const section1 = [
		{
			id: "introduction",
			title: "Introduction",
			content:
				"COGNIASSESS is dedicated to revolutionizing the recruitment process for non-technical roles by integrating advanced Artificial Intelligence (AI) and user-centric design principles. This platform addresses the need for an efficient, bias-free, and insightful evaluation of non-technical skills in a dynamic job market.",
			image: "/All LLM.png",
		},
	];

	const section2 = [
		{
			id: "platform",
			title: "Platform Design",
			content:
				"The design of COGNIASSESS focuses on leveraging state-of-the-art AI and Large Language Models (LLMs) to provide a smooth, intuitive user experience. The platform features automated systems for candidate profiling, real-time feedback, and interactive assessment tools, all designed to enhance the efficiency of recruiters and the satisfaction of candidates.",
			video: "path_to_platform_video.mp4",
		},
		{
			id: "development",
			title: "Development",
			content:
				"During the development phase, our team utilizes advanced Python libraries such as PyTorch and transformers to train our AI model on a diverse range of datasets. This phase also incorporates the fine-tuning of specialized models like Zephyr 7b, Mistral, and Llama 3, ensuring that our AI solutions are robust and tailored to the specific needs of non-technical role assessments.",
		},
		{
			id: "deployment",
			title: "Deployment",
			content:
				"The deployment phase focuses on integrating the fully trained AI models with the COGNIASSESS platform infrastructure. This step ensures that the platform is scalable, secure, and performs optimally under various operational conditions. Rigorous testing and iterative feedback loops are integral to this phase to guarantee a reliable deployment.",
		},
	];

	return (
		<div className="bg-dark-gray">
			<Navbar />
			<div className="container  mb-16 mx-auto px-4 ">
				<h1 className="text-4xl mt-16 font-rubic font-black text-center text-neon-green py-6">
					About us
				</h1>
				{section1.map((section) => (
					<Section key={section.id} {...section} />
				))}
				<div class="mx-auto w-4/6 text-center">
					<img src="/Objective.png" class="w-full h-auto"></img>
				</div>

				{section2.map((section) => (
					<Section key={section.id} {...section} />
				))}
			</div>
			<Accordion />
			<Footer />
		</div>
	);
};

export default About;
