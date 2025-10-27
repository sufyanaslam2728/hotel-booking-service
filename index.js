const connectToMongo = require("./models");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
connectToMongo(process.env.MONGO_URI);

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const port = process.env.PORT;

app.use(express.json());

// Error handlers functions:
const handleFinalOutputErrorResponse = (err, req, res, next) => {
  console.error("Hotel Booking logging", err.stack);
  return res.status(500).json(err.message);
};
const handleNotImplementedError = (req, res, next) => {
  return res.status(405).json("Method Not Allowed");
};
// Users route
const users = require("./routes/users");
app.use("/api/user", users);

// Rooms route
const rooms = require("./routes/rooms");
app.use("/api/room", rooms);

// CustomersData route
const customerData = require("./routes/customerData");
app.use("/api/customerData", customerData);

// Bookings route
const bookings = require("./routes/bookings");
app.use("/api/booking", bookings);

// error handlers
app.use(handleNotImplementedError);
app.use(handleFinalOutputErrorResponse);

app.get("/api", (req, res) => {
  res.send("Hotel Booking System Backend Running........");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
