const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    // unique: true,
    // match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
