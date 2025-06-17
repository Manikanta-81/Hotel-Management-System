// import customer model

const customerModel = require("../models/customerSchema");
const User = require("../models/userSchema");

const createCustomer = async (req, res) => {
  const { gender, contact, dob, address, nationality } = req.body;
  // const { user_id, gender, contact, dob, address, nationality } = req.body;
  //
  console.log(req.body);

  try {
    const userId = req.user._id;
    // const userId = user._id;
    // const userId = user_id;

    //Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check if the user is a customer
    if (user.role !== 1) {
      return res.status(400).json({ message: "User is not a customer" });
    }

    //check if the customer data already exists

    const existingCustomer = await customerModel.findOne({ user_id: userId });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer data already exists" });
    }

    const customer = new customerModel({
      user_id: userId,
      gender,
      contact,
      dob,
      address,
      nationality:"Indian",
      status: "Active", // Default status is "Active"
    });

    await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel
      .find()
      .populate("user_id", "name email");

    if (!customers.length) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.status(200).json({
      message: "All customers retrieved successfully",
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCustomerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const customer = await customerModel
      .findOne({ user_id: userId })
      .populate("user_id", "name email");

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found for the given User ID" });
    }

    res.status(200).json({
      message: "Customer details retrieved successfully",
      customer,
    });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCustomer, getAllCustomers, getCustomerByUserId };
