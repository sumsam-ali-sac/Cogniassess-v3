/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/pages/**/*.{html,jsx}",
		"./src/components/**/*.{html,jsx}",
	],
	theme: {
		extend: {
			colors: {
				"dark-gray": "#2b2b2b", // Custom dark gray
				"neon-green": "#d7ef43", // Custom neon green
				"off-white": "#fff", // More commonly used white
				"vivid-yellow": "#ffff00", // Custom vivid yellow
			},
			fontFamily: {
				rubic: ["Rubik", "sans-serif"], // Custom font Rubik
				worksans: ["Work Sans", "sans-serif"], // Custom font Work Sans
			},
			fontWeight: {
				black: 900, // Extra bold weight
			},
			scrollbar: ({ theme }) => ({
				DEFAULT: {
					backgroundColor: theme("colors.dark-gray"),
					"&:hover": {
						backgroundColor: theme("colors.vivid-yellow"),
					},
					borderRadius: "9999px", // Rounded corners
					width: "8px",
					height: "8px",
				},
			}),
			animation: {
				bounce: "bounce 5s infinite",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
