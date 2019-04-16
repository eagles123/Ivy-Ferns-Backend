const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema(
  {
    suburbName: String,
    hospital_name: String,
    beds: Number,
    longitude: Number,
    latitude: Number
  },
  { collacollectiontion: "hospitals" }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
