const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  confirmBooking,
  getBookingById,
} = require("../controllers/bookingControllers");


const  authenticateToken=require("../middlewares/userMiddleware");

//  POST route to create a new booking
router.post("/create-booking",authenticateToken, createBooking);

// GET route to fetch all bookings
router.get("/get-bookings", getAllBookings);

router.get("/get-booking-by-id/:bookingId", getBookingById);

router.put("/confirm-booking/:bookingId",authenticateToken, confirmBooking);

module.exports = router;