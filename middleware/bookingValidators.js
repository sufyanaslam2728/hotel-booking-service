const { body, param, validationResult } = require("express-validator");

const ValidateCreateBooking = [
  body("bookingName")
    .isString()
    .withMessage("The bookingName is must and should be a string."),
  body("roomIds")
    .isArray()
    .withMessage("The roomIds is must and should be an array."),
  body("customerId")
    .isString()
    .withMessage("The customerId is must and should be a string."),
  body("payment")
    .isInt()
    .withMessage("The payment is must and should be an integer."),
  body("paidAmount")
    .isInt()
    .withMessage("The paidAmount is must and should be an integer."),
  body("paymentFlag")
    .isBoolean()
    .withMessage("The paymentFlag is must and should be an boolean."),
  body("startDate")
    .isString()
    .withMessage("The startDate is must and should be an string."),
  body("endDate")
    .isString()
    .withMessage("The endDate is must and should be an string."),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

const ValidateUpdateBooking = [
  body("bookingName")
    .isString()
    .optional()
    .withMessage("The bookingName is must and should be a string."),
  body("roomIds")
    .isArray()
    .optional()
    .withMessage("The roomIds is must and should be an array."),
  body("customerId")
    .isString()
    .optional()
    .withMessage("The customerId is must and should be a string."),
  body("status")
    .isString()
    .optional()
    .withMessage("The status is must and should be an string."),
  body("payment")
    .isInt()
    .optional()
    .withMessage("The payment is must and should be an integer."),
  body("paidAmount")
    .isInt()
    .optional()
    .withMessage("The paidAmount is must and should be an integer."),
  body("paymentFlag")
    .isBoolean()
    .optional()
    .withMessage("The paymentFlag is must and should be an boolean."),
  body("startDate")
    .isString()
    .optional()
    .withMessage("The startDate is must and should be an string."),
  body("endDate")
    .isString()
    .optional()
    .withMessage("The endDate is must and should be an string."),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

const ValidateIdString = [
  param("bookingId")
    .isString()
    .isLength(24)
    .withMessage("This is not a valid Booking Id."),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];
module.exports = {
  ValidateCreateBooking,
  ValidateUpdateBooking,
  ValidateIdString,
};
