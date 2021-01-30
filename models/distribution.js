const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({
  serial_number: String,
  source: String,
  destination: String,
  batch: Number,
  low_range: Number,
  high_range: Number,
  start_date: Date,
  stop_date: Date,
  custodian: String,
});

distributionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Distribution", distributionSchema);
