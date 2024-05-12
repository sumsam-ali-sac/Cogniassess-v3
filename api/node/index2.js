import { config as dotenvConfig } from "dotenv";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function updateRandomUserScores() {
	try {
		await client.connect();
		const database = client.db("cogniassess"); // Replace with your actual database name
		const users = database.collection("users"); // Replace with your actual collection name
		const ranking = database.collection("rankings"); // Replace with your actual ranking collection name

		// Get random users
		const sampleUsers = await users
			.aggregate([{ $sample: { size: 10 } }])
			.toArray(); // Adjust size as needed

		// Update rankScore for each randomly selected user
		const updates = sampleUsers.map((user) => {
			const newRankScore = Math.floor(Math.random() * 100) + 1; // Generates a random rankScore between 1 and 100
			return ranking.updateOne(
				{ userID: user._id },
				{ $set: { rankScore: newRankScore } },
				{ upsert: true }
			);
		});

		// Execute all updates
		await Promise.all(updates);
		console.log("Rank scores updated successfully.");
	} catch (err) {
		console.error("Error updating rank scores:", err);
	} finally {
		await client.close();
	}
}

updateRandomUserScores();
