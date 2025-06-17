require("dotenv").config();

// const secretKey = process.env.JWT_SECRET;
// console.log(secretKey);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const path = require("path");
// const https = require("https"); // Import the HTTPS module
// const fs = require("fs"); // Import the File System module

// app.use(express.json());
const buildpath = path.join(__dirname, "../client/build");
app.use(express.static(buildpath));
console.log(__dirname);

//import routes

const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Manikanta81:MAni%402002@cluster0.1we6e.mongodb.net/Stay-Hub"
    );
    console.log("Connected to Database of MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);
  }
};

// cors middleware
app.use(
  cors({
    origin: "http://13.202.204.246",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// used to parse json requests
app.use(bodyparser.json());

// Cron job to release reserved rooms
require("./cronJobs/releaseReservedRooms"); // Import your cron  job file
require("./cronJobs/checkoutRooms"); // Import your checkout (cron) job file

app.get("/", (req, res) => {
  //   res.send("Server is working");
  res.send("Welcome to Hotel Management System and server is working  ");
});

//call  Routes(root url)
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
  console.log(`http://13.202.204.246`);

  connect();
});
