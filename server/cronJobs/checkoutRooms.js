const cron = require("node-cron");
const BookingModel = require("../models/bookingSchema");
const RoomModel = require("../models/roomSchema");

// Cron job to update room status, booking status for every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    const now = new Date();

    // Find confirmed bookings where checkout date has passed
    const bookingsToCheckOut = await BookingModel.find({
      check_out_date: { $lt: now },
      status: "confirmed",
    });

    if (bookingsToCheckOut.length > 0) {
      for (const booking of bookingsToCheckOut) {
        // Update room status to available
        const room = await RoomModel.findById(booking.room_id);
        if (room) {
          room.status = "Available";
          await room.save();
          console.log(`✅ Room ${room.room_number} is available.`);
        }

        // Update booking status to checkedOut
        booking.status = "checkedOut";
        // await booking.save();
        await booking.save({ validateBeforeSave: false });
        console.log(`✅ Booking ${booking._id} status updated to checkedOut as the user checkedOut date completed`);
      }
    } else {
      console.log("⏳ No bookings to check out.");
    }
  } catch (error) {
    console.error("❌ Error in checkout cron job:", error);
  }
});




