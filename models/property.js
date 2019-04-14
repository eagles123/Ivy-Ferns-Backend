const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    suburbName: String,
    price: Number
  },
  { collection: "properties" }
);

module.exports = mongoose.model("Property", propertySchema);
