const cron = require("node-cron");
const RoomModel = require("../models/roomSchema");

const timeLimit = 15;      // If reserved for more than 15 minutes, release the room

// Cron job to run every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    const now = new Date();

    // Find all rooms with status 'Reserved'
    const roomsToRelease = await RoomModel.find({ status: "Reserved" });

    if (roomsToRelease.length > 0) {
      for (const room of roomsToRelease) {
        if (room.reservedAt) {
          const reservationTime = new Date(room.reservedAt);
          const diffMinutes = (now - reservationTime) / (1000 * 60); // Minutes difference

          if (diffMinutes > timeLimit) {
            room.status = "Available"; // Update status to 'Available'
            room.reservedAt = null; // Clear reservedAt timestamp
            await room.save(); // Save changes
            console.log(`✅ Room ${room.room_number} has been released as the user didn't confirmed the booking.`);
          }
        }
      }
    } else {
      console.log("⏳ No rooms to release.");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
