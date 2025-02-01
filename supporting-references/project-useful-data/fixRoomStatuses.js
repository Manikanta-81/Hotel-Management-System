//used when the booking status is checkedout but the room status is not available


const BookingModel = require("../models/bookingSchema"); // Adjust path if needed
const RoomModel = require("../models/roomSchema");

async function fixRoomStatuses() {
  try {
    console.log("🔄 Starting room status fix...");

    // Find all bookings that have already been checked out
    const checkedOutBookings = await BookingModel.find({ status: "checkedOut" });

    if (checkedOutBookings.length === 0) {
      console.log("⚠️ No checked-out bookings found.");
    } else {
      console.log(`Found ${checkedOutBookings.length} checked-out bookings.`);
    }

    for (const booking of checkedOutBookings) {
      console.log(`🔍 Processing booking with ID: ${booking._id}`);

      // Make sure room_id exists in the booking
      if (!booking.room_id) {
        console.log(`⚠️ Booking ${booking._id} has no room_id. Skipping.`);
        continue;
      }

      const room = await RoomModel.findById(booking.room_id);
      
      // Check if room is found and its status is "Booked"
      if (room) {
        console.log(`🛏️ Room found: ${room.room_number}, current status: ${room.status}`);

        if (room.status === "Booked") {
          room.status = "Available";
          await room.save();
          console.log(`✅ Fixed: Room ${room.room_number} is now available.`);
        } else {
          console.log(`⚠️ Skipping room ${room.room_number}, current status: ${room.status}`);
        }
      } else {
        console.log(`⚠️ Room with ID ${booking.room_id} not found.`);
      }
    }

    console.log("✅ Room status fix completed.");
  } catch (error) {
    console.error("❌ Error fixing room statuses:", error);
  }
}

module.exports = fixRoomStatuses;



// in the server.js 

const fixRoomStatuses = require("./cronJobs/fixRoomStatuses");

(async () => {
  try {
    console.log("🔄 Starting to fix room statuses...");
    await fixRoomStatuses(); // Wait for the async function to complete
    console.log("✅ Room statuses fixed successfully.");
  } catch (err) {
    console.error("❌ Error fixing room statuses:", err);
  }
})();