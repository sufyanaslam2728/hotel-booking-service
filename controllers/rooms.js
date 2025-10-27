const Rooms = require("../models/Rooms");
const Bookings = require("../models/Bookings");
const jwt = require("jsonwebtoken");

// Create a new Room:
const createRoom = async (req, res) => {
  try {
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );

    let room = await Rooms.findOne({ number: req.body.number });

    if (room) {
      return res.status(400).json({
        message: "Sorry a room with this room number already exists.",
      });
    }

    room = await Rooms.create({
      status: req.body.status,
      number: req.body.number,
      floor: req.body.floor,
      beds: req.body.beds,
      type: req.body.type,
      ratePerDay: req.body.ratePerDay,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      createdBy: user.username,
      modifiedBy: user.username,
    });

    return res.status(200).json({ message: "Room created successfully." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not create room.",
    });
  }
};
//Get All Rooms:
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();

    if (rooms.length) {
      return res.status(200).json(rooms);
    }
    return res.status(404).json({ message: "There isn't any Rooms yet." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not retrieve Rooms.",
    });
  }
};

// Get Room By Id:
const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Rooms.findById(roomId);

    if (room) {
      return res.status(200).send(room);
    }
    return res.status(404).send("There isn't any room of this Id exist.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not get room by Id.",
    });
  }
};

// Update a Room:
const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (req.body.number) {
      const room = await Rooms.findOne({ number: req.body.number });
      if (room && room.id !== roomId) {
        return res.status(400).json({
          message: "Sorry a Room with this room number already exists.",
        });
      }
    }
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );
    const data = req.body;
    data["modifiedAt"] = Date.now();
    data["modifiedBy"] = user.username;
    const room = await Rooms.findByIdAndUpdate(roomId, data);

    if (room) {
      return res.status(200).json({
        message: "Room updated successfully.",
      });
    }
    return res
      .status(404)
      .json({ message: "There isn't any Room of this Id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not update the room by Id.",
    });
  }
};

// Delete a Room:
const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const booking = await Bookings.find({ roomIds: { $in: [roomId] } });
    if (booking.length) {
      return res.status(400).json({
        message: "Room cannot be deleted as it is already booked.",
      });
    }
    const room = await Rooms.findByIdAndDelete(roomId);

    if (room) {
      return res.status(200).json({
        message: "Room deleted successfully.",
      });
    }

    return res
      .status(404)
      .json({ message: "There isn't any Room of this id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not delete the room.",
    });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
};
