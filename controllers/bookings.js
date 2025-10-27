const Bookings = require("../models/Bookings");
const Rooms = require("../models/Rooms");

const jwt = require("jsonwebtoken");

// Create a new  Booking:
const createBooking = async (req, res) => {
  try {
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );

    const rIds = req.body.roomIds;
    const rooms = await Rooms.find({ _id: { $in: rIds } });
    if (rIds.length !== rooms.length) {
      const reqRoomIds = rooms.map((r) => {
        return r.id;
      });
      const missingRoom = rIds.filter((rs) => !reqRoomIds.includes(rs));
      return res.status(400).json({
        message: `Rooms with ids ${missingRoom.join(
          ","
        )} does not exist in our Hotel that's why this booking request cannot be processed.`,
      });
    }
    const bookedRoomsIds = rooms
      .map((r) => {
        if (r.status.toLowerCase() !== "available") {
          return r.id;
        } else {
          return;
        }
      })
      .filter(Boolean);

    if (bookedRoomsIds.length) {
      return res.status(400).json({
        message: `Rooms with ids ${bookedRoomsIds.join(
          ","
        )} are already booked that's why this booking request cannot be processed.`,
      });
    } else {
      const booking = await Bookings.create({
        bookingName: req.body.bookingName,
        roomIds: req.body.roomIds,
        customerId: req.body.customerId,
        status: "Confirmed",
        payment: req.body.payment,
        paidAmount: req.body.paidAmount,
        paymentFlag: req.body.paymentFlag,
        startDate: req.body.startDate,
        endDate: req.body.endDate,

        createdAt: Date.now(),
        modifiedAt: Date.now(),
        createdBy: user.username,
        modifiedBy: user.username,
      });
      await Rooms.updateMany(
        { _id: { $in: rIds } },
        { $set: { status: "booked" } }
      );

      return res.status(200).json({ message: "Booking created successfully." });
    }
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not create Booking.",
    });
  }
};
//Get All Bookings:
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();

    if (bookings.length) {
      return res.status(200).json(bookings);
    }
    return res.status(404).json({ message: "There isn't any Bookings yet." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not retrieve Bookings.",
    });
  }
};

// Get Booking By Id:
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Bookings.findById(bookingId);

    if (booking) {
      return res.status(200).send(booking);
    }
    return res.status(404).send("There isn't any Booking of this Id exist.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not get Booking by Id.",
    });
  }
};

// Update a Booking:
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, roomIds } = req.body;

    const bookingData = await Bookings.findById(bookingId);
    if (!bookingData) {
      return res
        .status(404)
        .json({ message: "There isn't any Booking of this Id exist." });
    }
    const bookingRoomIds = bookingData.roomIds;

    // check whether the room with this room number already exists or not:
    if (roomIds) {
      const rooms = await Rooms.find({ _id: { $in: roomIds } });
      if (roomIds.length !== rooms.length) {
        const reqRoomIds = rooms.map((r) => {
          return r.id;
        });
        const missingRoom = rIds.filter((rs) => !reqRoomIds.includes(rs));
        return res.status(400).json({
          message: `Rooms with ids ${missingRoom.join(
            ","
          )} does not exist in our Hotel that's why this booking request cannot be processed.`,
        });
      }
      const bookedRoomsIds = rooms
        .map((r) => {
          if (r.status !== "Available" && !bookingRoomIds.includes(r)) {
            return r.id;
          } else {
            return;
          }
        })
        .filter(Boolean);

      if (bookedRoomsIds.length) {
        return res.status(400).json({
          message: `Rooms with ids ${bookedRoomsIds.join(
            ","
          )} are already booked that's why this booking request cannot be processed.`,
        });
      }
    }
    if (status) {
      if (!["Confirmed", "Cancelled", "Completed"].includes(status)) {
        return res.status(400).json({
          message:
            "Invalid status. Status could be {Confirmed, Cancelled, Completed}",
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

    const booking = await Bookings.findByIdAndUpdate(bookingId, data);

    if (booking) {
      if (roomIds) {
        const identical = roomIds.every((r) => bookingRoomIds.includes(r));
        if (!identical) {
          const detachIds = bookingRoomIds.filter(
            (brd) => !roomIds.includes(brd)
          );
          await Rooms.updateMany(
            { _id: { $in: detachIds } },
            {
              $set: {
                status: "Available",
              },
            }
          );
        }
      }
      if (roomIds || status) {
        await Rooms.updateMany(
          { _id: { $in: roomIds || bookingRoomIds } },
          {
            $set: {
              status: `${
                status && status !== "Confirmed" ? "Available" : "Booked"
              }`,
            },
          }
        );
      }

      return res.status(200).json({
        message: "Booking updated successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not update the Booking by Id.",
    });
  }
};

// Delete a Booking:
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Bookings.findByIdAndDelete(bookingId);

    if (booking) {
      return res.status(200).json({
        message: "Booking deleted successfully.",
      });
    }

    return res
      .status(404)
      .json({ message: "There isn't any Booking of this id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not delete the Booking.",
    });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
