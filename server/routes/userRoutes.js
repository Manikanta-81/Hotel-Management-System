const express = require("express");

// require controllers
const router = express.Router();

//import jwt token

const authenticateToken = require("../middlewares/userMiddleware");
// const authorizeRole = require("../middlewares/userMiddleware");

const Roles = {
  CUSTOMER: 1,
  STAFF: 2,
};

const {
  createUser,
  getAllusers,
  loginuser,
} = require("../controllers/userControllers");

//create user router
router.post("/register-user", createUser);

//create login route
router.post("/login-user", loginuser);

// get all users route
router.get("/get-all-users", getAllusers);

//export router
module.exports = router;
