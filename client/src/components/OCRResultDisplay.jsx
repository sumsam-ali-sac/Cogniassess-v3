import React from "react";

const OCRResultDisplay = ({ ocrText }) => {
	return (
		<div className="bg-neutral-700 mx-auto p-10 rounded-lg w-1/2 mt-5">
			<h3 className="text-neon-green">OCR Result:</h3>
			<p className="text-white">{ocrText}</p>
		</div>
	);
};

export default OCRResultDisplay;
