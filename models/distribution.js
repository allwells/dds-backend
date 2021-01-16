const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema({
  serial: String,
  source: String,
  destination: String,
  movement_date: Date,
  arrival_date: Date,
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
