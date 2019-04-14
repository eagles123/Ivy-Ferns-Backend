const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const healthSchema = new Schema(
  {
    suburbName: String,
    hospital: Number,
    gps: Number,
    beds: Number
  },
  { collection: "health" }
);

module.exports = mongoose.model("Health", healthSchema);
