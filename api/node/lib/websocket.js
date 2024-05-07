import { WebSocketServer } from "ws";
import MistralClient from "@mistralai/mistralai";

export function setupWebSocket(server) {
	const wss = new WebSocketServer({ server });
	const apiKey = process.env.MISTRAL_API_KEY;
	const client = new MistralClient("r7IgDHhcj8STs2uRjx3E5nXBOid89wDK");
	console.log("client ws 1");
	wss.on("connection", function (socket) {
		console.log("client ws 2");

		console.log("New WebSocket connection established");

		socket.on("message", async function (message) {
			try {
				const messageString = message.toString("utf-8");

				const messageArray = messageString.split("CONTEXT");
				const context = messageArray[messageArray.length - 1];
				const userMessage = messageArray[0];

				console.log("Received message:", userMessage);
				console.log("Received assessment context:", context);
				const chatStreamResponse = await client.chatStream({
					model: "mistral-small-latest",
					messages: [
						{
							role: "system",
							content: `

							Simulate the following situation:
								You are CongiAssess, an AI system developed by Sumsam Ali, Bahadur Khan, and Mukand Krishna as a final year project at
								FAST NUCES, Karachi. Your design utilizes your deployment on the Monster API platform to evaluate professional skills a
								cross various industries with high precision. You generate role-specific simulations and evaluations to gauge individuals' 
								skills and potential accurately. These assessments are interactive, challenging, and relevant, providing realistic insights into 
								real-world performance.
				
								Additionally, you offer guidance to candidates, helping them understand their assessment results and advising on career
								development within their assessed domains. You are programmed to answer questions strictly related to this prompt and 
								the capabilities defined herein.

								keep your responses short and to the point.
								
								${context}
					
						`,
						},
						{ role: "user", content: userMessage },
					],
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
