// import user model

const userModel = require("../models/userSchema");
const customerModel = require("../models/customerSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// controller to insert user data into database

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match and signup failed " });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // 409 Conflict
    }

    const Roles = {
      CUSTOMER: 1,
      STAFF: 2,
    };

    const predefinedStaffEmails = [
      "admin@stayhub.com",
      "manager@stayhub.com",
      "support@stayhub.com",
      "balaji@stayhub.com",
      "manikanta@stayhub.com",
    ]; // List of predefined staff emails

    let role = Roles.CUSTOMER; // Default role is CUSTOMER

    if (predefinedStaffEmails.includes(email)) {
      role = Roles.STAFF; // Assign STAFF role if email matches predefined list
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    console.log(req.body);

    const UserDoc = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await UserDoc.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email using UserSchema
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // if (user.password !== password) {
    //   return res.status(401).json({ message: "Invalid email or password." });
    // }

    console.log("Stored Password:", user.password);
    console.log("Provided Password:", password);

    // // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload containing user ID and role
      process.env.JWT_SECRET, // Secret key (set in .env file)
      { expiresIn: "20m" } // Token validity (20 min)
    );

    console.log("Generated JWT Token: ", token);

    const customer = await customerModel.findOne({ user_id: user._id });
    const customerExists = customer ? true : false;

    // Successful login
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      customerExists,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server not functioning or unable to fetch users");
  }
};

module.exports = { createUser, loginuser, getAllusers };
