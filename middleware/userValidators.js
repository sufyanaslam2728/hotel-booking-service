const { body, param, validationResult } = require("express-validator");

const ValidateCreateUser = [
  body("username")
    .isString()
    .withMessage("The username is must and should be a string."),
  body("role")
    .isString()
    .withMessage("The role is must and should be a string."),
  body("password")
    .isString()
    .withMessage("The password is must and should be a string."),
  body("email")
    .isString()
    .withMessage("The email is must and should be an string."),
  body("phoneNo")
    .isInt()
    .withMessage("The phoneNo is must and should be an integer."),
  body("address")
    .isString()
    .withMessage("The address is must and should be an string."),
  body("salary")
    .isInt()
    .withMessage("The salary is must and should be an integer."),
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

const ValidateUpdateUser = [
  body("username")
    .isString()
    .optional()
    .withMessage("The username is must and should be a string."),
  body("role")
    .isString()
    .optional()
    .withMessage("The role is must and should be a string."),
  body("password")
    .isString()
    .optional()
    .withMessage("The password is must and should be a string."),
  body("email")
    .isString()
    .optional()
    .withMessage("The email is must and should be an string."),
  body("phoneNo")
    .isInt()
    .optional()
    .withMessage("The phoneNo is must and should be an integer."),
  body("address")
    .isString()
    .optional()
    .withMessage("The address is must and should be an string."),
  body("salary")
    .isInt()
    .optional()
    .withMessage("The salary is must and should be an integer."),
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
  param("id")
    .isString()
    .isLength(24)
    .withMessage("This is not a valid User Id."),

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
  ValidateCreateUser,
  ValidateUpdateUser,
  ValidateIdString,
};
