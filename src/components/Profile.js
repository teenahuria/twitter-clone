import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux';
import useGetProfile from './hooks/useGetProfile.js'
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant.js';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice.js';
import { getMyProfile, getUser } from '../redux/userSlice.js';

const Profile = () => {
  const { user, profile } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useGetProfile(id);
const followAndUnfollowHandler = async () => {
  axios.defaults.withCredentials = true;

  const isFollowing = user?.following?.includes(id?.toString());

  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/${isFollowing ? "unfollow" : "follow"}/${id}`,
      { id: user?._id }
    );

    toast.success(res.data.message);

    //  Step 1: REFRESH logged-in user
    const updatedMe = await axios.get(`${USER_API_END_POINT}/profile/${user._id}`);
    dispatch(getUser(updatedMe.data.user));

    //  Step 2: REFRESH this profile user
    const updatedProfile = await axios.get(`${USER_API_END_POINT}/profile/${id}`);
    dispatch(getMyProfile(updatedProfile.data.user));

  } catch (error) {
    console.log("FOLLOW/UNFOLLOW ERROR:", error);
    toast.error(error?.response?.data?.message || "Action failed");
  }
};

  return (
    <div className="w-1/2 border-x border-gray-300 min-h-screen bg-white relative">

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 sticky top-0 bg-white border-b z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
          <IoMdArrowBack className="text-xl" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold">{profile?.name}</h1>
          <p className="text-sm text-gray-500">100 Tweets</p>
        </div>
      </div>

      {/* Banner */}
      <img
        src="https://cdn.textstudio.com/output/sample/normal/1/5/9/5/teena-logo-73-25951.png"
        className="w-full h-48 object-cover"
        alt="banner"
      />

      {/* Avatar */}
      <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" size="100" round />
      </div>

      {/* Edit / Follow button */}
      <div className="flex justify-end px-4 mt-2">

  {(() => {
    console.log("PROFILE ID:", profile?._id);
    console.log("LOGGED-IN USER ID:", user?._id);
    console.log("PARAM ID:", id);
    console.log("FOLLOWING LIST:", user?.following);
    console.log("Is Following?:", user?.following?.includes(id?.toString()));
    console.log("Should show:", profile?._id === user?._id ? "Edit Profile" : user?.following?.includes(id?.toString()) ? "Following" : "Follow");
  })()}

  {profile?._id === user?._id ? (
    <button className="px-4 py-1.5 border border-gray-400 rounded-full text-sm font-semibold">
      Edit Profile
    </button>
  ) : (
    <button
      onClick={followAndUnfollowHandler}
      className="px-4 py-1.5 border border-gray-400 rounded-full text-sm font-semibold bg-black text-white"
    >
      {user?.following?.includes(id?.toString()) ? "Following" : "Follow"}
    </button>
  )}

</div>


      {/* User Info */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold">{profile?.name}</h2>
        <p className="text-sm text-gray-500">@{profile?.username}</p>

        <p className="mt-2 text-sm text-gray-800">
          Frontend Developer | React Enthusiast 🌸  
          Learning JS, Node, UI/UX ✨
        </p>
      </div>
    </div>
  );
};

export default Profile;
