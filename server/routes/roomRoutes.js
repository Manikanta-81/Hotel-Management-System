const express = require("express");
const router = express.Router();
const { createRoom, getAllRooms ,getRoomById} = require("../controllers/roomcontrollers");

// Create a room
router.post("/create-room", createRoom);

// Get all rooms
router.get("/get-all-rooms", getAllRooms);

//get room by Id

router.get("/getSingleRoom/:id", getRoomById);


module.exports = router;
