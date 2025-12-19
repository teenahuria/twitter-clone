import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Description and User ID are required",
        success: false,
      });
    }
    const user=await User.findById(id);
    await Tweet.create({ description, userId: id,userDetails:user });
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

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;

    await Tweet.findByIdAndDelete(id);
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

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });

      return res.status(200).json({
        message: "Tweet disliked successfully",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
    }
    return res.status(200).json({
      message: "Tweet like status updated",
      success: true,
    });
  } catch (error) {
    console.log("Like/Dislike Error:", error);
    return res.status(500).json({
      message: "Failed to update like status",
      error: error.message,
    });
  }
};


//getAllTweets=loggedInUser+following users tweets
export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id; // logged-in user ID
     if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing in request params",
      });
    }
    const loggedInUser = await User.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //  Get tweets of the logged-in user
    const loggedInUserTweets = await Tweet.find({ userId: id });

    // Get tweets of users they follow
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return Tweet.find({ userId: otherUserId });
      })
    );

    // Combine & return all tweets
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingUserTweets),
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
export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id; // logged-in user ID
    const loggedInUser = await User.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // ❗ Remove logged-in user from following list (important)
    const followingOnly = loggedInUser.following.filter(
      (uid) => uid.toString() !== id.toString()
    );

    // Fetch tweets of following users only
    const followingUserTweets = await Tweet.find({
      userId: { $in: followingOnly }
    });

    return res.status(200).json({
      tweets: followingUserTweets,
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
