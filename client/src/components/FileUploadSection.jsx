import React from "react";

const FileUploadSection = ({
	isUploading,
	fileName,
	handleFileChange,
	children,
}) => {
	return (
		<div className="bg-neutral-700 mt-5 mx-auto p-10 rounded-lg text-neon-green font-bold w-1/2 h-38 hover:bg-neutral-600">
			<div className="flex justify-center items-center w-27 h-25 mx-auto">
				<img src="/UploadCV.png" alt="Upload Image" />
			</div>
			<input
				type="file"
				id="cvFile"
				className="hidden"
				accept=".pdf"
				onChange={handleFileChange}
			/>
			<label
				htmlFor="cvFile"
				className="block tracking-wider text-xl md:text-xl font-worksans mt-2 font-normal text-white opacity-50 cursor-pointer">
				{isUploading ? "Uploading File..." : "Click to upload file"}
			</label>
			{children}
			<div
				id="fileName"
				className="mt-2.5 text-center tracking-wider text-l md:text-l font-worksans font-normal  overflow-auto">
				{fileName}
			</div>
		</div>
	);
};

export default FileUploadSection;
