const Feedback = require("../models/feedbackSchema");
const Booking = require("../models/bookingSchema"); // Importing the Booking model for validation

// Add feedback for a specific booking
const addFeedback = async (req, res) => {
  try {
    const {
      booking_id,
      comments,
      room_rating,
      service_rating,
      cleanliness_rating,
      would_recommend,
      stay_purpose,
    } = req.body;

    console.log("Received Feedback Data:", req.body); // Lo

    // Validate if the booking exists
    const bookingExists = await Booking.findById(booking_id);
    if (!bookingExists) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Add a check to prevent duplicate feedback submissions
    const existingFeedback = await Feedback.findOne({ booking_id: booking_id });
    if (existingFeedback) {
      return res
        .status(400)
        .json({ message: "Feedback already submitted for this booking" });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      booking_id,
      comments,
      room_rating,
      service_rating,
      cleanliness_rating,
      would_recommend,
      stay_purpose,
    });

    await newFeedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get feedback by booking ID
const getFeedbackByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Fetch feedback for the given booking ID
    const feedback = await Feedback.findOne({ booking_id: bookingId }).populate(
      "booking_id",
      "check_in_date check_out_date price customer_id room_id"
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback retrieved successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all feedback (optional, useful for staff/admins)

const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find().populate(
      "booking_id",
      "customer_id room_id"
    );
    res.status(200).json({
      message: "All feedback retrieved successfully",
      feedback: feedbackList,
    });
  } catch (error) {
    console.error("Error fetching feedback list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addFeedback, getFeedbackByBookingId, getAllFeedback };
