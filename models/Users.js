const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  role: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true },
  age: { type: Number },
  gender: { type: String },
  dob: { type: Date },
  createdAt: { type: Date, default: Date.now },
});
const Users = mongoose.model("users", UserSchema);
module.exports = Users;
