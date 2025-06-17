const mongoose = require("mongoose");
// const { type } = require("os");

// Define role constants for better readability

const Roles = {
  CUSTOMER: 1,
  STAFF: 2,
};

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long."],
    },

    role: {
      type: Number,
      required: true,
      enum: Object.values(Roles), // Ensures only valid roles
      default: Roles.CUSTOMER, // Default role is CUSTOMER (1)
    },
  },

  {
    timestamps: true,
  }
);

//create a user model

const User = mongoose.model("User", userSchema);

module.exports = User;


