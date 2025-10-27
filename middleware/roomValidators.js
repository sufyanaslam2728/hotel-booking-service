const { body, param, validationResult } = require("express-validator");

const ValidateCreateRoom = [
  body("status")
    .isString()
    .withMessage("The status is must and should be a string."),
  body("number")
    .isString()
    .withMessage("The room number is must and should be a string."),
  body("floor")
    .isString()
    .withMessage("The floor is must and should be a string."),
  body("beds")
    .isInt()
    .withMessage("The beds is must and should be an integer."),
  body("type")
    .isString()
    .withMessage("The room type is must and should be an string."),
  body("ratePerDay")
    .isInt()
    .withMessage("The ratePerDay is must and should be an integer."),

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

const ValidateUpdateRoom = [
  body("status")
    .isString()
    .optional()
    .withMessage("The status is must and should be a string."),
  body("number")
    .isString()
    .optional()
    .withMessage("The room number is must and should be a string."),
  body("floor")
    .isString()
    .optional()
    .withMessage("The floor is must and should be a string."),
  body("beds")
    .isInt()
    .optional()
    .withMessage("The beds is must and should be an integer."),
  body("type")
    .isString()
    .optional()
    .withMessage("The room type is must and should be an string."),
  body("ratePerDay")
    .isInt()
    .optional()
    .withMessage("The ratePerDay is must and should be an integer."),

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
  param("roomId")
    .isString()
    .isLength(24)
    .withMessage("This is not a valid Room Id."),

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
  ValidateCreateRoom,
  ValidateUpdateRoom,
  ValidateIdString,
};
