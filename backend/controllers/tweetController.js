import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

/* ================= CREATE TWEET ================= */
export const createTweet = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user; // ✅ from auth middleware

    if (!description) {
      return res.status(400).json({
        message: "Description is required",
        success: false,
      });
    }

    const user = await User.findById(userId);

    await Tweet.create({
      description,
      userId,
      userDetails: user,
    });

    return res.status(201).json({
      message: "Tweet created successfully",
      success: true,
    });

  } catch (error) {
    console.log("Create Tweet Error:", error);
    return res.status(500).json({
      message: "Failed to create tweet",
      error: error.message,
    });
  }
};

/* ================= DELETE TWEET ================= */
export const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    //  Only owner can delete
    if (tweet.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized to delete this tweet",
      });
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });

  } catch (error) {
    console.log("Delete Tweet Error:", error);
    return res.status(500).json({
      message: "Failed to delete tweet",
      error: error.message,
    });
  }
};

/* ================= LIKE / DISLIKE ================= */
export const likeOrDislike = async (req, res) => {
  try {
    const userId = req.user; // ✅ authenticated user
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    if (tweet.like.includes(userId)) {
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: userId },
      });

      return res.status(200).json({
        message: "Tweet disliked",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: userId },
      });

      return res.status(200).json({
        message: "Tweet liked",
        success: true,
      });
    }

  } catch (error) {
    console.log("Like/Dislike Error:", error);
    return res.status(500).json({
      message: "Failed to update like status",
      error: error.message,
    });
  }
};

/* ================= GET ALL TWEETS ================= */
export const getAllTweets = async (req, res) => {
  try {
    const userId = req.user;

    const loggedInUser = await User.findById(userId);

    const myTweets = await Tweet.find({ userId });
    const followingTweets = await Tweet.find({
      userId: { $in: loggedInUser.following },
    });

    return res.status(200).json({
      tweets: [...myTweets, ...followingTweets],
      success: true,
    });

  } catch (error) {
    console.log("Get All Tweets Error:", error);
    return res.status(500).json({
      message: "Failed to fetch tweets",
      error: error.message,
    });
  }
};

/* ================= GET FOLLOWING TWEETS ================= */
export const getFollowingTweets = async (req, res) => {
  try {
    const userId = req.user;

    const loggedInUser = await User.findById(userId);

    const followingTweets = await Tweet.find({
      userId: { $in: loggedInUser.following },
    });

    return res.status(200).json({
      tweets: followingTweets,
      success: true,
    });

  } catch (error) {
    console.log("Get Following Tweets Error:", error);
    return res.status(500).json({
      message: "Failed to fetch following tweets",
      error: error.message,
    });
  }
};
