import { WebSocketServer } from "ws";
import MistralClient from "@mistralai/mistralai";

export function setupWebSocket(server) {
	const wss = new WebSocketServer({ server });
	const apiKey = process.env.MISTRAL_API_KEY;
	const client = new MistralClient(apiKey);
	console.log("client ws 1");
	wss.on("connection", function (socket) {
		console.log("client ws 2");

		console.log("New WebSocket connection established");

		socket.on("message", async function (message) {
			try {
				const messageString = message.toString("utf-8");
				console.log("Received message:", messageString);

				const chatStreamResponse = await client.chatStream({
					model: "mistral-tiny",
					messages: [{ role: "user", content: messageString }],
				});

				for await (const chunk of chatStreamResponse) {
					if (
						chunk.choices &&
						chunk.choices[0].delta &&
						chunk.choices[0].delta.content !== undefined
					) {
						const streamText = chunk.choices[0].delta.content;
						socket.send(streamText);
					}
				}
			} catch (error) {
				console.error("Error during chat stream:", error);
				socket.send("Error: " + error.message);
			}
		});

		socket.on("close", () => {
			console.log("WebSocket connection closed");
		});

		socket.on("error", (error) => {
			console.error("WebSocket error:", error);
		});
	});
}
