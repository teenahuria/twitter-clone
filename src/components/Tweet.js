import axios from "axios";
import React from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { timeSince, TWEET_API_END_POINT, USER_API_END_POINT } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // LIKE / DISLIKE
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      dispatch(getRefresh());
      if (res?.data?.success) toast.success(res?.data?.message);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  // DELETE TWEET
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  // BOOKMARK HANDLER
  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmarks/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      dispatch(getRefresh());
      toast.success(res?.data?.message);
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  // CHECK IF BOOKMARKED BY LOGGED USER
  const isBookmarked = tweet?.bookmarks?.includes(user?._id);

  return (
    <div className="flex items-start space-x-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      
      {/* Avatar */}
      <Avatar
        src={tweet?.userDetails?.[0]?.profilePic || "https://mui.com/static/images/avatar/1.jpg"}
        size="50"
        round={true}
      />

      <div className="flex flex-col">
        
        {/* Name + Username */}
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold text-gray-900">
            {tweet?.userDetails?.[0]?.name || "Unknown"}
          </h1>

          <p className="text-gray-500 text-sm">
            @{tweet?.userDetails?.[0]?.username || "user"} ·{" "}
            {tweet?.createdAt ? timeSince(tweet?.createdAt) : ""}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-800 text-[15px] mt-1">
          {tweet?.description || ""}
        </p>

        {/* Action Icons */}
        <div className="flex items-center gap-8 mt-3 text-gray-500">

          {/* Comment */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
            <FaRegComment size={18} />
            <span className="text-sm">{tweet?.comments?.length || 0}</span>
          </div>

          {/* Like */}
          <div
            onClick={() => likeOrDislikeHandler(tweet?._id)}
            className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition"
          >
            <FaRegHeart size={18} />
            <span className="text-sm">{tweet?.like?.length || 0}</span>
          </div>

          {/* Bookmark */}
          <div
            onClick={() => bookmarkHandler(tweet?._id)}
            className="flex items-center gap-1 cursor-pointer transition"
          >
            <FaRegBookmark
              size={18}
              className={
                isBookmarked
                  ? "text-yellow-500"
                  : "text-gray-500 hover:text-yellow-500"
              }
            />

            {isBookmarked && (
              <span className="text-sm text-yellow-600 font-medium">
                Bookmarked
              </span>
            )}
          </div>

          {/* Delete */}
          {user?._id === tweet?.userId && (
            <div
              onClick={() => deleteTweetHandler(tweet?._id)}
              className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition"
            >
              <FaTrash size={18} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
