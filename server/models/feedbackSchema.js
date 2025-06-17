const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    comments: {
      type: String,
      trim: true,
      maxlength: 500, // Optional length limit for feedback
      required: false,
    },
    room_rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    service_rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    cleanliness_rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    would_recommend: {
      type: Boolean,
      default: true, // Indicates if the customer would recommend the hotel
      required: true,
    },
    stay_purpose: {
      type: String,
      enum: ["Business", "Leisure", "Exploring", "Vacation", "Conference","Others"], // Dropdown-like options
      required: false, // Optional but useful for analytics
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
