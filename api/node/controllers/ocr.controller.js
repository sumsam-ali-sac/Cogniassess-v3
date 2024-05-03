import {
	DocumentAnalysisClient,
	AzureKeyCredential,
} from "@azure/ai-form-recognizer";
import dotenv from "dotenv";
import * as fs from "fs";
import axios from "axios";
import CV from "../models/cv.model.js";
import path from "path";

dotenv.config();

export const processUpload = async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	const userId = req.body.userId || req.header("X-User-ID");
	console.log(userId);
	if (!userId) {
		return res.status(400).send("User ID is required.");
	}

	try {
		const key = process.env.AZURE_OCR_KEY;
		const endpoint = process.env.AZURE_OCR_ENDPOINT;
		const client = new DocumentAnalysisClient(
			endpoint,
			new AzureKeyCredential(key)
		);
		console.log(req.file.path);
		const file = fs.createReadStream(req.file.path);

		const poller = await client.beginAnalyzeDocument(
			"prebuilt-layout",
			file
		);
		const result = await poller.pollUntilDone();

		let extractedText = result.pages
			.map((page) => page.lines.map((line) => line.content).join("\n"))
			.join("\n\n");

		const timestamp = new Date().toISOString().replace(/:/g, "-");
		const extension = path.extname(req.file.originalname);
		const newFileName = `${userId}_${timestamp}${extension}`;
		const newFilePath = path.join(path.dirname(req.file.path), newFileName);

		await CV.findOneAndUpdate(
			{ userID: userId },
			{
				userID: userId,
				cvContent: extractedText,
				cvBlobFileName: newFileName,
			},
			{ upsert: true, new: true }
		);

		const fastApiUrl = "http://localhost:8000/process-text";
		const response = await axios.post(fastApiUrl, {
			userId,
			extractedText,
		});
		const data = response.data;

		fs.rename(req.file.path, newFilePath, (err) => {
			if (err) {
				console.error("Error renaming file:", err);
				return res.status(500).send("Failed to rename file.");
			}

			res.json({
				message: "File uploaded and OCR processed successfully",
				extractedText,
				filePath: newFilePath,
			});
		});
	} catch (error) {
		console.error("OCR processing failed:", error);
		res.status(500).send("OCR processing failed.");
	}
};
