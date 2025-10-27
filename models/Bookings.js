const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingsSchema = new Schema({
  bookingName: { type: String, required: true },
  roomIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
  ],
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customerData",
    required: true,
  },
  status: { type: String, required: true },
  payment: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  paymentFlag: { type: Boolean, required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  modifiedBy: { type: String, required: true },
});
const Bookings = mongoose.model("bookings", BookingsSchema);
module.exports = Bookings;
