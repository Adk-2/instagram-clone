const mongoose = require("mongoose");

// Comment schema (sub-document)
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Post schema
const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // ✅ COMMENTS ARE INSIDE THE SCHEMA NOW
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
