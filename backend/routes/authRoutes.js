const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMyProfile } = require("../controllers/authController");

const {
  registerUser,
  loginUser,
  followUnfollowUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id/follow", protect, followUnfollowUser);
router.get("/me", protect, getMyProfile);


module.exports = router;
