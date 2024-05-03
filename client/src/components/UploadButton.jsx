import React from "react";

const UploadButton = ({ hidden, handleFileUpload }) => {
	return (
		<button
			onClick={handleFileUpload}
			hidden={hidden}
			className="bg-neon-green font-worksans font-normal text-black px-4 py-2 text-sm md:text-lg m-10 cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green">
			Start CV Analysis
		</button>
	);
};

export default UploadButton;
