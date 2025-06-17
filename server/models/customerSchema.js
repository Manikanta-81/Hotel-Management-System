const mongoose = require("mongoose");
const User = require("./userSchema");

const customerSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    contact: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    nationality: {
      type: String,
      default: "Indian", // Default nationality set to "Indian"
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
