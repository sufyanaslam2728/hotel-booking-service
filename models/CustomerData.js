const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerDataSchema = new Schema({
  name: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  address: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  gender: { type: String },
  dob: { type: Date },
  passportNo: { type: String, required: true, unique: true },

  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  modifiedBy: { type: String, required: true },
});
const CustomerData = mongoose.model("customerData", CustomerDataSchema);

module.exports = CustomerData;
