const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    check_in_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Ensure comparison starts at the beginning of the day
          return value >= today; // Check-in must be today or later
        },
        message: "Check-in date must not be in the past.",
      },
    },
    check_out_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.check_in_date;
        },
        message: "Check-out date must be later than check-in date.",
      },
    },
    price: {
      type: Number, // Holds the total price for the booking
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "checkedOut"],
      default: "pending", // Initially set to pending when booking is created
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
