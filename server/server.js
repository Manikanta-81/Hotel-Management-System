require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Optional: If you're serving the React build from Express, uncomment these
// const buildpath = path.join(__dirname, "../client/build");
// app.use(express.static(buildpath));
// console.log(__dirname);

// Import routes
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Manikanta81:MAni%402002@cluster0.1we6e.mongodb.net/Stay-Hub"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
  }
};

// CORS for local development
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON requests
app.use(bodyparser.json());

// Cron jobs
require("./cronJobs/releaseReservedRooms");
require("./cronJobs/checkoutRooms");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management System (Local Server Running)");
});

// API routes
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  connect();
});
