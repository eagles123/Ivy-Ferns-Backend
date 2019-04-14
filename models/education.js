const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const educationSchema = new Schema(
  {
    suburbName: String,
    pre_school: Number,
    primary_school: Number,
    secondary_school: Number
  },
  { collection: "education" }
);

module.exports = mongoose.model("Education", educationSchema);
