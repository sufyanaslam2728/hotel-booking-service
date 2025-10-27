const express = require("express");
const router = express.Router();
const {
  getAllCustomersData,
  createCustomerData,
  getCustomerDataById,
  updateCustomerData,
  deleteCustomerData,
} = require("../controllers/customerData");
const {
  ValidateCreateCustomerData,
  ValidateUpdateCustomerData,
  ValidateIdString,
} = require("../middleware/customerDataValidators");
const authenticateUser = require("../middleware/authentication");

router.get("/getAllCustomersData", authenticateUser, getAllCustomersData);
router.post(
  "/createCustomerData",
  authenticateUser,
  ValidateCreateCustomerData,
  createCustomerData
);
router.get(
  "/getCustomerData/:customerId",
  authenticateUser,
  ValidateIdString,
  getCustomerDataById
);
router.put(
  "/updateCustomerData/:customerId",
  authenticateUser,
  ValidateIdString,
  ValidateUpdateCustomerData,
  updateCustomerData
);
router.delete(
  "/deleteCustomerData/:customerId",
  authenticateUser,
  ValidateIdString,
  deleteCustomerData
);

module.exports = router;
