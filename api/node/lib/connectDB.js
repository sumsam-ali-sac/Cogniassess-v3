import mongoose from "mongoose";

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
}
