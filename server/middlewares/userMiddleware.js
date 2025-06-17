const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema"); // Your User model

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
  // Get token from Authorization header
  // const token = req.header("Authorization");
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer [token]

  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the database
    const user = await UserModel.findById(decoded.id); // decoded.id is the user ID embedded in the token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the decoded user info to the request object
    // req.user = decoded;
    req.user = user;

    if (user.role !== 1) {
      // 1 corresponds to 'customer' role
      console.log("403 Forbidden: Not a customer");
      return res
        .status(403)
        .json({ message: "Access denied. You are not a customer." });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    console.error(error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

// // Authorization Middleware - To check if the user has the correct role to access the route
// const authorizeRole = (allowedRoles) => {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         message:
//           "Access denied. You are not authorized to access this resource.",
//       });
//     }
//     next(); // Proceed to the next middleware or route
//   };
// };

module.exports = authenticateToken;
// module.exports= authorizeRole;
