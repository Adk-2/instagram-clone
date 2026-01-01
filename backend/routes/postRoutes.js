const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createPost,
  getAllPosts,
  likeUnlikePost,
  addComment
} = require("../controllers/postController");


const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);

// Get feed (protected)
router.get("/", protect, getAllPosts);

// Like / Unlike post
router.put("/:id/like", protect, likeUnlikePost);

// Add comment to post
router.post("/:id/comment", protect, addComment);

module.exports = router;
