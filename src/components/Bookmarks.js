import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constant";
import { useSelector, useDispatch } from "react-redux";
import Tweet from "./Tweet";
import { getRefresh } from "../redux/tweetSlice";

const Bookmarks = () => {
  const { user } = useSelector((store) => store.user);
  const { refresh } = useSelector((store) => store.tweet);

  const dispatch = useDispatch();
  const [bookmarks, setBookmarks] = useState([]);

  // FETCH BOOKMARKED TWEETS
  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(
        `${USER_API_END_POINT}/bookmarks/${user?._id}`,
        { withCredentials: true }
      );

      setBookmarks(res.data.bookmarks);
    } catch (error) {
      console.log("Bookmark Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [refresh]);  // refresh triggers re-fetch

  return (
    <div className="w-[55%] border-l border-r border-gray-200 min-h-screen">
      <h1 className="p-4 text-xl font-bold border-b border-gray-300">
        Bookmarked Tweets
      </h1>

      {bookmarks?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No bookmarks yet.</p>
      )}

      {bookmarks.map((tweet) => (
        <Tweet
          key={tweet._id}
          tweet={tweet}
          onUnbookmark={(id) => {
            setBookmarks((prev) => prev.filter((t) => t._id !== id));
            dispatch(getRefresh()); //                       trigger global refresh
          }}
        />
      ))}
    </div>
  );
};

export default Bookmarks;
