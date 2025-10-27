const mongoose = require("mongoose");
const Users = require("./Users");
const bcrypt = require("bcryptjs");

const connectToMongo = (mongoURI) => {
  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("Database Connected Successfully.");
      const existingUser = await Users.findOne({ username: "admin" });

      if (!existingUser) {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash("admin123", salt); // default password

        // Create default user
        await Users.create({
          role: "admin",
          username: "admin",
          password: secPass,
          email: "admin@example.com",
          phoneNo: 1234567890,
          address: "Default Admin Address",
          salary: 0,
          age: 30,
          gender: "Male",
        });

        console.log("✅ Default admin user created successfully");
      } else {
        console.log("ℹ️ Default admin user already exists");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = connectToMongo;
