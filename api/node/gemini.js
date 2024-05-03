import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyAfChM6LNmdf7vY6c94C5ZjcnywMVjqYYE";

async function run() {
	const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

	const prompt = "Write a story about a magic backpack.";

	const result = await model.generateContentStream(prompt);

	let text = "";
	for await (const chunk of result.stream) {
		const chunkText = chunk.text();
		console.log(chunkText);
		text += chunkText;
	}
}

async function runChat(USER_INPUT) {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [],
	});

	const result = await chat.sendMessageStream(USER_INPUT);

	let text = "";
	for await (const chunk of result.stream) {
		const chunkText = chunk.text();
		console.log(chunkText);
		text += chunkText;
	}
}

runChat("hello");
