import React from "react";

// Additional styling for animations and enhancements
const spinnerAnimation = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`;

export default function Spinner({ text }) {
	return (
		<>
			<style>{spinnerAnimation}</style>
			<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
				<div className="text-center">
					<div
						className="spinner-border animate-spin inline-block w-12 h-12 border-8 rounded-full"
						style={{
							borderColor: "transparent",
							borderTopColor: "#d7ef43",
							animation:
								"spin 1s linear infinite, pulse 2s infinite ease-in-out",
						}}></div>
					<p className="text-white mt-2 text-2xl text-center font-rubic font-black  tracking-wide ">
						{text}
					</p>
				</div>
			</div>
		</>
	);
}
