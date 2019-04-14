const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suburbSchema = new Schema(
  {
    suburbName: String,
    healthScore: Number,
    educationScore: Number,
    propetyScore: Number,
    jobScore: Number
  },
  { collection: "ratings" }
);

module.exports = mongoose.model("Rating", suburbSchema);
