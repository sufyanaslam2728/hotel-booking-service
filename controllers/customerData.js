const CustomerData = require("../models/CustomerData");
const Bookings = require("../models/Bookings");

const jwt = require("jsonwebtoken");

// Create a new CustomerData:
const createCustomerData = async (req, res) => {
  try {
    const user = jwt.verify(
      req.headers.cookie?.split("authToken=")[1],
      process.env.JWT_SECRET
    );

    let customerData = await CustomerData.findOne({
      passportNo: req.body.passportNo,
    });

    if (customerData) {
      return res.status(400).json({
        message: "Sorry a Customer with this passport number already exists.",
      });
    }

    customerData = await CustomerData.create({
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      dob: req.body.dob,
      passportNo: req.body.passportNo,

      createdAt: Date.now(),
      modifiedAt: Date.now(),
      createdBy: user.username,
      modifiedBy: user.username,
    });

    return res.status(200).json({ message: "Customer created successfully." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not create customer.",
    });
  }
};
//Get All Customers:
const getAllCustomersData = async (req, res) => {
  try {
    const customersData = await CustomerData.find();

    if (customersData.length) {
      return res.status(200).json(customersData);
    }
    return res
      .status(404)
      .json({ message: "There isn't any Customers Data yet." });
  } catch (error) {
    console.error(error.message);

    res.status(500).send({
      error: "Internal Server Error: Could not retrieve Customers Data.",
    });
  }
};

// Get CustomerData By Id:
const getCustomerDataById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = await CustomerData.findById(customerId);

    if (customerData) {
      return res.status(200).send(customerData);
    }
    return res
      .status(404)
      .send("There isn't any CustomerData of this Id exist.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      error: "Internal Server Error: Could not get CustomerData by Id.",
    });
  }
};

// Update a CustomerData:
const updateCustomerData = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (req.body.passportNo) {
      const customerData = await CustomerData.findOne({
        passportNo: req.body.passportNo,
      });
      if (customerData && customerData.id !== customerId) {
        return res.status(400).json({
          message: "Sorry a Customer with this passport number already exists.",
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

    const customerData = await CustomerData.findByIdAndUpdate(customerId, data);

    if (customerData) {
      return res.status(200).json({
        message: "CustomerData updated successfully.",
      });
    }
    return res
      .status(404)
      .json({ message: "There isn't any CustomerData of this Id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not update the CustomerData by Id.",
    });
  }
};

// Delete a CustomerData:
const deleteCustomerData = async (req, res) => {
  try {
    const { customerId } = req.params;
    const booking = await Bookings.find({ customerId: customerId });
    console.log("booking", booking);
    if (booking.length) {
      return res.status(400).json({
        message: "Customer cannot be deleted as it has a booking.",
      });
    }

    const customerData = await CustomerData.findByIdAndDelete(customerId);

    if (customerData) {
      return res.status(200).json({
        message: "Customer deleted successfully.",
      });
    }

    return res
      .status(404)
      .json({ message: "There isn't any CustomerData of this id exist." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Internal Server Error: Could not delete the CustomerData.",
    });
  }
};

module.exports = {
  getAllCustomersData,
  createCustomerData,
  getCustomerDataById,
  updateCustomerData,
  deleteCustomerData,
};
