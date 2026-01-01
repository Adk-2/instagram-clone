const mongoose = require("mongoose");

// User Schema = structure of Instagram user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
      // Never store plain password
    },

    profilePic: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
