const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms");
const authenticateUser = require("../middleware/authentication");
const {
  ValidateCreateRoom,
  ValidateIdString,
  ValidateUpdateRoom,
} = require("../middleware/roomValidators");

router.get("/getAllRooms", authenticateUser, getAllRooms);
router.post("/createRoom", authenticateUser, ValidateCreateRoom, createRoom);
router.get("/getRoom/:roomId", authenticateUser, ValidateIdString, getRoomById);
router.put(
  "/updateRoom/:roomId",
  authenticateUser,
  ValidateIdString,
  ValidateUpdateRoom,
  updateRoom
);
router.delete(
  "/deleteRoom/:roomId",
  authenticateUser,
  ValidateIdString,
  deleteRoom
);

module.exports = router;
