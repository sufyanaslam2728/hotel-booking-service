const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

const authenticateUser = require("../middleware/authentication");

const {
  ValidateCreateBooking,
  ValidateIdString,
  ValidateUpdateBooking,
} = require("../middleware/bookingValidators");

router.get("/getAllBookings", authenticateUser, getAllBookings);
router.post(
  "/createBooking",
  authenticateUser,
  ValidateCreateBooking,
  createBooking
);
router.get(
  "/getBooking/:bookingId",
  authenticateUser,
  ValidateIdString,
  getBookingById
);
router.put(
  "/updateBooking/:bookingId",
  authenticateUser,
  ValidateIdString,
  ValidateUpdateBooking,
  updateBooking
);
router.delete(
  "/deleteBooking/:bookingId",
  authenticateUser,
  ValidateIdString,
  deleteBooking
);

module.exports = router;
