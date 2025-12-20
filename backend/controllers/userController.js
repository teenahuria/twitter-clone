import bcrypt from 'bcryptjs';
import { User } from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Tweet} from "../models/tweetSchema.js";
dotenv.config({ path: '../config/.env' });

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

  
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    
    console.log("Password Type:", typeof password, "Value:", password);

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Create user
    await User.create({ name, username, email, password: hashedPassword });

    //Final success response
    return res.status(201).json({
      message: "User registered successfully",
      user: { name, username, email },
      success: true,
    });

  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });

    return res
      .status(201)
      .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({
        message: "Login successful",

        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          followers: user.followers,
          following: user.following,
          bookmarks: user.bookmarks,
          createdAt: user.createdAt,
        },

        success: true,
      });
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()), 
    })
    .json({
      message: "Logout successful",
      success: true,
    });
};
export const bookmarks = async (req, res) => {
  try {
    const loggedInUserId = req.user; 
    const tweetId = req.params.id; 

    
    const user = await User.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Check if tweet exists (optional but recommended)
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    //  Toggle bookmark
    if (user.bookmarks.includes(tweetId)) {
      // remove from bookmarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Tweet removed from bookmarks",
        success: true,
      });
    } else {
      // add to bookmarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Tweet added to bookmarks",
        success: true,
      });
    }
  } catch (error) {
    console.log("Bookmark Error:", error);
    return res.status(500).json({
      message: "Failed to update bookmarks",
      error: error.message,
    });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const id=req.params.id;
    const user = await User.findById(id);
    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Get Profile Error:", error);
    return res.status(500).json({   
        message: "Failed to fetch user profile",        
        error: error.message,
      });
  }
};

export const getOtherUsers= async (req, res) => {
    try {
        const {id}=req.params;
        const otherUsers= await User.find({_id:{$ne:id}}).select("-password"); // all users except logged in user
        if(!otherUsers){
            return res.status(404).json({
                message:"No other users found",
                success:false,
            });
        }   
        return res.status(200).json({
            message:"Other users fetched successfully",
            otherUsers,
            success:true,
        });
    } catch (error) {
        console.log("Get Other Users Error:", error);
        return res.status(500).json({
            message: "Failed to fetch other users",
            error: error.message,
        });
    }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    // Prevent following yourself
    if (loggedInUserId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    // If user not found
    if (!loggedInUser || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already following → Send message
    if (user.followers.includes(loggedInUserId)) {
      return res.status(200).json({
        success: false,
        message: `You already follow ${user.name}`,
        alreadyFollowing: true,
      });
    }

    // Follow user
    await user.updateOne({ $push: { followers: loggedInUserId } });
    await loggedInUser.updateOne({ $push: { following: userId } });

    return res.status(200).json({
      success: true,
      message: `You are now following ${user.name}`,
    });

  } catch (error) {
    console.log("Follow Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to follow user",
      error: error.message,
    });
  }
};

export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;

    // Prevent unfollowing yourself
    if (loggedInUserId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    // If user not found
    if (!loggedInUser || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If NOT following → return message
    if (!user.followers.includes(loggedInUserId)) {
      return res.status(400).json({
        success: false,
        message: `You are not following ${user.name}`,
      });
    }

    // Unfollow user
    await user.updateOne({ $pull: { followers: loggedInUserId } });
    await loggedInUser.updateOne({ $pull: { following: userId } });

    return res.status(200).json({
      success: true,
      message: `You have unfollowed ${user.name}`,
    });

  } catch (error) {
    console.log("Unfollow Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to unfollow user",
      error: error.message,
    });
  }
};
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .populate({
        path: "bookmarks",
        populate: {
          path: "userId",
          model: "User",
          select: "name username profilePic"
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      bookmarks: user.bookmarks
    });

  } catch (error) {
    console.log("Bookmarks Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks"
    });
  }
};
