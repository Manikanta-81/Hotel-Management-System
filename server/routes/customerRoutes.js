const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/userMiddleware");

const {
  createCustomer,
  getAllCustomers,
  getCustomerByUserId,
} = require("../controllers/customerControllers");

router.post("/create-customer", authenticateToken, createCustomer);

router.get("/getcustomers",  getAllCustomers);

router.get("/getcustomer/:userId",  getCustomerByUserId);

module.exports = router;
