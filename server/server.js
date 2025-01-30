// Load environment variables from .env file
require("dotenv").config();

// const secretKey = process.env.JWT_SECRET;
// console.log(secretKey);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

//import routes

const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes= require("./routes/contactRoutes");

const connect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/HotelManagement");
    console.log("Connected to Database of MongoDB");
  } catch {
    console.log(err.message);
  }
};

// cors middleware
app.use(cors());

// used to parse json requests
app.use(bodyparser.json());

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

const PORT = 80;
app.listen(PORT, () => {
  console.log("Server is listening on port ", 80);
  console.log(`http://localhost:80`);
  connect();
});
