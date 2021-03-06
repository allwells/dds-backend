const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  serial_number: String,
  drug_name: String,
  manufacture_date: Date,
  expiry_date: Date,
  nafdac_reg_no: String,
  net_weight: Number,
  type: String,
  producer: String,
});

drugSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Drug", drugSchema);
