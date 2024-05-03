import React from "react";

const ProgressBar = ({ fileSize, uploadProgress, isUploading }) => {
	return isUploading ? (
		<div className="relative pt-1">
			<div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-neon-green-200">
				<div
					style={{ width: `${uploadProgress}%` }}
					className="shadow-none flex flex-col text-center whitespace-nowrap text-neutral-800 justify-center bg-neon-green">
					{`${uploadProgress}% (${(fileSize / 1024).toFixed(2)} KB)`}
				</div>
			</div>
		</div>
	) : null;
};

export default ProgressBar;
