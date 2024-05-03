import express from "express";
import multer from "multer";
import { processUpload } from "../controllers/ocr.controller.js";

// Set up custom storage for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const fileExtension = file.originalname.split(".").pop();
		const newFilename =
			file.fieldname + "-" + Date.now() + "." + fileExtension;
		cb(null, newFilename);
	},
});

const upload = multer({ storage: storage });

const ocrRouter = express.Router();

ocrRouter.post("/ocr", upload.single("file"), processUpload);

export default ocrRouter;
