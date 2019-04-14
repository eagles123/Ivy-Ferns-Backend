const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const suburbSchema = new Schema(
  {
    city: String,
    suburbName: String
  },
  { collection: "suburbs" }
);

module.exports = mongoose.model("Suburb", suburbSchema);
