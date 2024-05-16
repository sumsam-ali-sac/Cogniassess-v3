import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FileUploadSection from "../components/FileUploadSection";
import ProgressBar from "../components/ProgressBar";
import ExistingCVDisplay from "../components/ExistingCVDisplay";
import TextDisplay from "../components/TextDisplay";
import UploadButton from "../components/UploadButton";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

function UploadCV() {
	const user = useSelector((state) => state.user.user);
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("No file chosen");
	const [fileSize, setFileSize] = useState(0);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");
	const [ocrText, setOcrText] = useState("");
	const [existingCV, setExistingCV] = useState(null);
	const [cvProcessed, setCvProcessed] = useState(false);
	const [cvSummary, setcvSummary] = useState("");
	const [cvAnalysis, setcvAnalysis] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		} else {
			const fetchExistingCV = async () => {
				if (user && user.id) {
					try {
						const response = await axios.get(
							`/api/node/cv/check${user.id}`
						);
						setExistingCV(response.data.cvContent);
					} catch (error) {
						console.log("Error fetching existing CV:", error);
					}
				}
			};

			fetchExistingCV();
		}
	}, [user, navigate]);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setFileName(selectedFile.name);
			setFileSize(selectedFile.size);
		}
	};

	const handleUploadAgain = () => {
		setFile(null);
		setFileName("No file chosen");
		setFileSize(0);
		setUploadProgress(0);
		setIsUploading(false);
		setStatusMessage("");
		setOcrText("");
		setCvProcessed(false);
		setExistingCV(null);
	};

	const handleFileUpload = async () => {
		if (file && user) {
			setIsUploading(true);
			setStatusMessage("Saving file...");
			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", user.id);

			try {
				const response = await axios.post(
					"/api/node/upload/ocr",
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
						onUploadProgress: (progressEvent) => {
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							);
							setUploadProgress(percentCompleted);
							setStatusMessage("Scanning file...");
						},
					}
				);

				setTimeout(() => setStatusMessage("Extracting text..."), 1000);
				setTimeout(
					() => setStatusMessage("Saving extracted text..."),
					2000
				);
				setTimeout(() => {
					setStatusMessage(
						"Configuring for assessment generation..."
					);
					setOcrText(response.data.extractedText);
					setcvAnalysis(response.data.analysis);
					setcvSummary(response.data.summary);
					console.log(response.data.analysis);
					console.log(response.data.summary);
					setUploadProgress(100);
					setCvProcessed(true);
				}, 3000);
			} catch (error) {
				console.error("Error uploading file:", error);
			} finally {
				setTimeout(() => setIsUploading(false), 3500);
			}
		}
	};

	const handleCVAnalysis = async () => {
		setIsUploading(true);
		setStatusMessage("Analyzing file...");

		try {
			const response = await axios.post("/api/node/cv/analysis", {
				extractedText: existingCV,
				userId: user.id,
			});
			setcvAnalysis(response.data.analysis);
			setOcrText(existingCV);
			setcvSummary(response.data.summary);
			console.log(response.data.analysis);
			console.log(response.data.summary);

			setTimeout(() => setStatusMessage("Summarizing CV..."), 1000);
			setTimeout(() => setStatusMessage("Saving Analysis ..."), 2000);
			setTimeout(
				() =>
					setStatusMessage(
						"Configuring for assessment generation..."
					),
				3000
			);
		} catch (error) {
			console.error("Error uploading file:", error);
		} finally {
			setTimeout(() => setIsUploading(false), 3500);
		}
	};

	const handleGenerateAssessment = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		localStorage.removeItem("assessmentStartTime");
		navigate("/assessment");
	};

	return (
		<div>
			<Navbar />
			{isUploading && <Spinner text={statusMessage} />}
			<section className="bg-neutral-800 pt-40 pb-1 text-center">
				<div className="mx-auto mb-24 w-5/6">
					<h1 className="text-5xl font-rubic font-black mb-5 leading-snug text-neon-green">
						Upload <span className="text-white">CV</span>
					</h1>
					{existingCV ? (
						<>
							<ExistingCVDisplay />
							<div className="flex items-center justify-center gap-8  mt-16 mb-36">
								<button
									onClick={handleGenerateAssessment}
									className="inline-flex items-center justify-center bg-neon-green font-worksans font-normal text-black px-4 py-2 text-sm md:text-lg cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green w-64 h-12">
									Generate Assessment
								</button>
								<button
									onClick={handleUploadAgain}
									className="inline-flex items-center justify-center bg-neon-green font-worksans font-normal text-black px-4 py-2 text-sm md:text-lg cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green w-64 h-12">
									Upload Again
								</button>
								<button
									onClick={handleCVAnalysis}
									className="inline-flex items-center justify-center bg-neon-green font-worksans font-normal text-black px-4 py-2 text-sm md:text-lg cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green w-64 h-12">
									Analyze CV
								</button>
							</div>
							<div className="px-4 py-8">
								{cvSummary && (
									<TextDisplay
										title="CV Summary"
										text={cvSummary}
									/>
								)}
								{cvAnalysis && (
									<TextDisplay
										title="CV Analysis"
										text={cvAnalysis}
									/>
								)}
								{ocrText && (
									<TextDisplay
										title="OCR Result"
										text={ocrText}
									/>
								)}
							</div>
						</>
					) : (
						<div>
							<FileUploadSection
								isUploading={isUploading}
								fileName={fileName}
								handleFileChange={handleFileChange}>
								<ProgressBar
									fileSize={fileSize}
									uploadProgress={uploadProgress}
									isUploading={isUploading}
								/>
							</FileUploadSection>
							<UploadButton
								hidden={cvProcessed}
								handleFileUpload={handleFileUpload}
							/>
							{cvProcessed && (
								<button
									onClick={handleGenerateAssessment}
									className="mt-5 inline-flex items-center justify-center bg-neon-green font-worksans font-normal text-black px-4 py-2 text-sm md:text-lg cursor-pointer rounded-lg transition-colors border-2 border-neon-green hover:bg-dark-gray hover:text-neon-green w-50 h-12">
									Generate Assessment
								</button>
							)}
							<div className="px-4 py-8 mb-36">
								{cvSummary && (
									<TextDisplay
										title="CV Summary"
										text={cvSummary}
									/>
								)}
								{cvAnalysis && (
									<TextDisplay
										title="CV Analysis"
										text={cvAnalysis}
									/>
								)}
								{ocrText && (
									<TextDisplay
										title="OCR Result"
										text={ocrText}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</section>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h2 className="text-xl font-rubic text-off-white font-bold mb-4">
					Assessment Instructions
				</h2>
				<p className="mb-4 font-worksans text-off-white ">
					Please review the instructions carefully before proceeding
					with the assessment.
				</p>
				<ul className="list-disc list-inside mb-4 font-worksans text-off-white ">
					<li>
						The assessment will be based on selected domains, each
						having 5 questions.
					</li>
					<li>There will be 3 personality questions.</li>
					<li>There will be 1 job scenario question.</li>
					<li>
						Total allocated will be two hours, once it gets over the
						assessment will be submitted automatically.
					</li>

					<li>
						Answer each question carefully after reading it
						thoroughly.
					</li>
				</ul>
				<p className="text-off-white font-worksans">
					Click "Close" to proceed to the assessment.
				</p>
			</Modal>
			<Footer />
		</div>
	);
}

export default UploadCV;
