const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    suburbName: String,
    agriculture: Number,
    mining: Number,
    manufacture: Number,
    power_gas_water: Number,
    construction: Number,
    wholesale: Number,
    retail: Number,
    acc_food: Number,
    transport: Number,
    it: Number,
    finance_insure: Number,
    real_estate: Number,
    professional: Number,
    admin: Number,
    public: Number,
    health_care: Number,
    art: Number,
    other: Number
  },
  { collection: "jobs" }
);

module.exports = mongoose.model("Job", jobSchema);
