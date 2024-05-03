import React from "react";

const UpdateSection = () => {
	return (
		<div className="bg-dark-gray mx-auto p-10 pb-36 pt-14 md:p-20">
			<div className="bg-neutral-700 p-5 rounded-lg mx-auto my-12 max-w-5xl shadow-lg flex flex-col md:flex-row items-center justify-between">
				<div className="flex-shrink-0 mb-6 md:mb-0">
					<img
						src="/update.png"
						alt="Astronaut"
						className="rounded-lg w-full max-w-xs m-7 mx-auto md:max-w-md"
					/>
				</div>
				<div className="md:ml-6">
					<h1 className="text-neon-green text-3xl font-rubic font-black mb-4 text-center md:text-left">
						Never <span className="text-white">Miss An Update</span>
					</h1>
					<p className="text-white font-worksans md:tracking-wider text-xl md:text-xl mb-6 text-center md:text-left">
						Join our community of AI enthusiasts and get exclusive
						access to updates, promos, and rewards.
					</p>
					<form className="flex flex-col md:flex-row font-worksans md:tracking-wider text-l md:text-l items-center justify-center md:justify-start">
						<input
							type="email"
							placeholder="Enter your email here"
							className="flex-1 p-3 rounded-l-md border-2 border-gray-300 border-r-0 mb-4 md:mb-0"
						/>
						<button
							type="submit"
							className="bg-neon-green text-black px-6 py-3 rounded-r-md transition-colors border-2 border-neon-green hover:bg-neutral-700 hover:text-neon-green">
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateSection;
