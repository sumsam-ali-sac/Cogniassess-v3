"use strict";

var _dotenv = require("dotenv");

var _mongodb = require("mongodb");

var uri = process.env.MONGO;
var client = new _mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function updateRandomUserScores() {
  var database, users, ranking, sampleUsers, updates;
  return regeneratorRuntime.async(function updateRandomUserScores$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          database = client.db("cogniassess"); // Replace with your actual database name

          users = database.collection("users"); // Replace with your actual collection name

          ranking = database.collection("rankings"); // Replace with your actual ranking collection name
          // Get random users

          _context.next = 8;
          return regeneratorRuntime.awrap(users.aggregate([{
            $sample: {
              size: 10
            }
          }]).toArray());

        case 8:
          sampleUsers = _context.sent;
          // Adjust size as needed
          // Update rankScore for each randomly selected user
          updates = sampleUsers.map(function (user) {
            var newRankScore = Math.floor(Math.random() * 100) + 1; // Generates a random rankScore between 1 and 100

            return ranking.updateOne({
              userID: user._id
            }, {
              $set: {
                rankScore: newRankScore
              }
            }, {
              upsert: true
            });
          }); // Execute all updates

          _context.next = 12;
          return regeneratorRuntime.awrap(Promise.all(updates));

        case 12:
          console.log("Rank scores updated successfully.");
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error updating rank scores:", _context.t0);

        case 18:
          _context.prev = 18;
          _context.next = 21;
          return regeneratorRuntime.awrap(client.close());

        case 21:
          return _context.finish(18);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15, 18, 22]]);
}

updateRandomUserScores();