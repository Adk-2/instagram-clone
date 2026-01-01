const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware protects routes
const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Get user from token (without password)
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Move to next function
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
