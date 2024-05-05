"use strict";

var rankingSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  rankScore: {
    type: Number,
    required: true,
    "default": 0
  }
});
var Ranking = mongoose.model("Ranking", rankingSchema);