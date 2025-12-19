import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      }
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
