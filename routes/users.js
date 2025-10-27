const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const authenticateUser = require("../middleware/authentication");
const {
  ValidateCreateUser,
  ValidateIdString,
  ValidateUpdateUser,
} = require("../middleware/userValidators");

router.post("/createUser", authenticateUser, ValidateCreateUser, createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", authenticateUser, getAllUsers);
router.get("/getUser/:id", authenticateUser, ValidateIdString, getUserById);
router.put(
  "/updateUser/:id",
  authenticateUser,
  ValidateIdString,
  ValidateUpdateUser,
  updateUser
);
router.delete(
  "/deleteUser/:id",
  authenticateUser,
  ValidateIdString,
  deleteUser
);

module.exports = router;
