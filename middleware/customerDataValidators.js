const { body, param, validationResult } = require("express-validator");

const ValidateCreateCustomerData = [
  body("name")
    .isString()
    .withMessage("The name is must and should be a string."),
  body("phoneNo")
    .isInt()
    .withMessage("The phoneNo is must and should be a integer."),
  body("address")
    .isString()
    .optional()
    .withMessage("The address is must and should be a string."),
  body("email")
    .isString()
    .optional()
    .withMessage("The email is must and should be an string."),
  body("age")
    .isInt()
    .optional()
    .withMessage("The age is must and should be an integer."),
  body("gender")
    .isString()
    .optional()
    .withMessage("The gender is must and should be an string."),
  body("dob")
    .isString()
    .optional()
    .withMessage("The dateOfBirth is must and should be an string."),
  body("passportNo")
    .isString()
    .withMessage("The passportNo is must and should be an string."),

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

const ValidateUpdateCustomerData = [
  body("name")
    .isString()
    .optional()
    .withMessage("The name is must and should be a string."),
  body("phoneNo")
    .isInt()
    .optional()
    .withMessage("The phoneNo is must and should be a integer."),
  body("address")
    .isString()
    .optional()
    .withMessage("The address is must and should be a string."),
  body("email")
    .isString()
    .optional()
    .withMessage("The email is must and should be an string."),
  body("age")
    .isInt()
    .optional()
    .withMessage("The age is must and should be an integer."),
  body("gender")
    .isString()
    .optional()
    .withMessage("The gender is must and should be an string."),
  body("dob")
    .isString()
    .optional()
    .withMessage("The dateOfBirth is must and should be an string."),
  body("passportNo")
    .isString()
    .optional()
    .withMessage("The passportNo is must and should be an string."),

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
  param("customerId")
    .isString()
    .isLength(24)
    .withMessage("This is not a valid Customer Id."),

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
  ValidateCreateCustomerData,
  ValidateUpdateCustomerData,
  ValidateIdString,
};
