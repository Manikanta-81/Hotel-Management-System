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
    const mongoUrl = process.env.MONGODB_URL || "mongodb+srv://Manikanta81:9618863286MANI@cluster0.1we6e.mongodb.net/Hotel-management-system";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
    
    // Start cron jobs after successful MongoDB connection
    require("./cronJobs/releaseReservedRooms");
    require("./cronJobs/checkoutRooms");
    console.log("✅ Cron jobs started successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
  }
};

// CORS configuration for deployment
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
      "http://localhost:3001", 
      "http://localhost:5000",
      "https://hotel-management-system-txxk.onrender.com" // Render backend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Parse JSON requests
app.use(bodyparser.json());

// Cron jobs
// Cron jobs will be started after MongoDB connection
// require("./cronJobs/releaseReservedRooms");
// require("./cronJobs/checkoutRooms");

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Hotel Management System API",
    status: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  connect();
});
