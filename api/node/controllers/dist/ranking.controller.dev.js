"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leaderboard = void 0;

var _rankingModel = _interopRequireDefault(require("../models/ranking.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var leaderboard = function leaderboard(req, res) {
  var _leaderboard;

  return regeneratorRuntime.async(function leaderboard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_rankingModel["default"].aggregate([{
            $lookup: {
              from: "users",
              localField: "userID",
              foreignField: "_id",
              as: "userDetails"
            }
          }, {
            $unwind: "$userDetails"
          }, {
            $sort: {
              rankScore: -1
            }
          }, {
            $limit: 10
          }]));

        case 3:
          _leaderboard = _context.sent;
          res.json(_leaderboard.map(function (item) {
            return {
              username: item.userDetails.username,
              avatar: item.userDetails.avatar,
              rankScore: item.rankScore
            };
          }));
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching leaderboard: ", _context.t0);
          res.status(500).send("Error fetching leaderboard");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.leaderboard = leaderboard;