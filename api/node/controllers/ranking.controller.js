import Ranking from "../models/ranking.model.js";

export const leaderboard = async (req, res) => {
	try {
		// Fetch top 10 candidates with rank scores and user details
		const leaderboard = await Ranking.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "userID",
					foreignField: "_id",
					as: "userDetails",
				},
			},
			{ $unwind: "$userDetails" },
			{ $sort: { rankScore: -1 } },
			{ $limit: 10 },
		]);

		res.json(
			leaderboard.map((item) => ({
				username: item.userDetails.username,
				avater: item.userDetails.avatar,
				rankScore: item.rankScore,
			}))
		);
	} catch (e) {
		console.error("Error fetching leaderboard: ", e);
		res.status(500).send("Error fetching leaderboard");
	}
};
