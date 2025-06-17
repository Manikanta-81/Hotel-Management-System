const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel_name: {
      type: String,
      required: true,
      // unique: true,
    },

    room_number: {
      type: String,
      required: true,
      // unique: true, // Ensures room number is unique
    },

    address: {
      type: String,
      required: true,
    },

    room_type: {
      type: String,
      required: true,
      enum: ["Single", "Double", "Deluxe", "Villa", "Bungalow", "Penthouse"], // Room types
    },
    price: {
      type: Number,
      required: true, // Price per night
    },

    status: {
      type: String, // Store string values
      enum: ["Available", "Reserved", "Booked", "Maintenance"],
      default: "Available", // Default to "Available"
    },

    image: {
      type: String, // URL or Path to the image
      required: false, // Optional, only if you allow images
    },

    Ratings: {
      type: Number,
      required: true,
    },
    reservedAt: {
      type: Date, // Stores the timestamp when the room was reserved
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
