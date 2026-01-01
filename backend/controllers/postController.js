const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

// CREATE POST WITH IMAGE UPLOAD
const createPost = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    console.log("Uploading to Cloudinary...");
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    );

    const post = await Post.create({
      image: uploadResult.secure_url, // Cloudinary image URL
      caption: req.body.caption,
      user: req.user._id
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
      console.error("CLOUDINARY ERROR:", error);

      res.status(500).json({
        message: "Cloudinary upload failed",
        error: error.message
      });
    }
};


// GET ALL POSTS (FEED)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });



    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE / UNLIKE POST
const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.json({ message: "Post unliked" });
    }

    post.likes.push(userId);
    await post.save();

    res.json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD COMMENT
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Initialize comments if missing (for old posts)
    if (!post.comments) {
      post.comments = [];
    }

    post.comments.push({
      user: req.user._id,
      text
    });


    await post.save();

    res.status(201).json({
      message: "Comment added",
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ EXPORT EVERYTHING (THIS WAS THE REAL ISSUE)
module.exports = {
  createPost,
  getAllPosts,
  likeUnlikePost,
  addComment
};
