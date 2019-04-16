const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const neighbourSchema = new Schema(
  {
    suburbName: String,
    neighbour_name: Array
  },
  { collection: "neighbours" }
);

module.exports = mongoose.model("Neighbour", neighbourSchema);
