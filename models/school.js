const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolSchema = new Schema(
  {
    suburbName: String,
    school_name: String,
    icsea: Number,
    lga_average: Number,
    ts_ration: Number,
    enrollment: Number,
    longitude: Number,
    latitude: Number
  },
  { collacollectiontion: "schools" }
);

module.exports = mongoose.model("School", schoolSchema);
