const Room = require("../models/roomSchema");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const {
      hotel_name,
      address,
      room_number,
      room_type,
      price,
      status,
      image,
      Ratings,
    } = req.body;

    console.log(req.body);

    // Check if the room number already exists in the hotel
    const existingRoom = await Room.findOne({ hotel_name, room_number });
    if (existingRoom) {
      return res
        .status(400)
        .json({ message: "Room number already exists in the specified hotel" });
    }

    const newRoom = new Room({
      hotel_name,
      address,
      room_number,
      room_type,
      price,
      status:"Available",
      image,
      Ratings,
    });

    // Save the new room to the database
    await newRoom.save();

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating room", error: error.message });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    // console.log(rooms);

    if (rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res
      .status(200)
      .json({ rooms: rooms, message: "Rooms fetched successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching rooms", error: error.message });
  }
};

// Get a room by ID
// Get a room by ID
const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id; // Extract room ID from request parameters

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room, message: "Room retrieved successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching room", error: error.message });
  }
};



module.exports = { createRoom, getAllRooms, getRoomById };
