const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middlewares (ONLY ONCE)
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("Instagram Backend is Running 🚀");
});

// routes
app.use("/api/auth", authRoutes);

const postRoutes = require("./routes/postRoutes");

app.use("/api/posts", postRoutes);


const protect = require("./middleware/authMiddleware");

// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user
  });
});


// database
connectDB();

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
