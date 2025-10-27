const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomsSchema = new Schema({
  status: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  floor: { type: String, required: true },
  beds: { type: Number, required: true },
  type: { type: String, required: true },
  ratePerDay: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  modifiedBy: { type: String, required: true },
});
const Rooms = mongoose.model("rooms", RoomsSchema);
module.exports = Rooms;
