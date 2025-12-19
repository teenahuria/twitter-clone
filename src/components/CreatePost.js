import React from 'react';
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import { useState } from 'react';
import axios from 'axios';
import { TWEET_API_END_POINT } from './utils/constant';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePost = () => {
  const [description, setDescription] = useState(''); 
  const {user}=useSelector(store=>store.user);
  const {isActive}=useSelector(store=>store.tweet);
  const dispatch=useDispatch();
  const submitHandler = async () => {
   try {
    const res=await axios.post(`${TWEET_API_END_POINT}/create`,{description,id:user?._id },{withCredentials:true});
    dispatch(getRefresh());
    if(res.data.success){
      toast.success(res.data.message);
    }
   } catch (error) {
    toast.success(error.response.data.message);
    console.log(error);
    
    
   }
   setDescription("");
  }
  const forYouHandler=()=>{
    dispatch(getIsActive(true));

  }

  const followingHandler=()=>{
       dispatch(getIsActive(false));

  }
 
  return (
    <div className="flex flex-col mt-5 bg-white w-[100%]">
      {/* Header Section */}

<div className="flex justify-evenly items-center border-b border-gray-200 py-2">
  <div className="flex space-x-12 py-3">

    {/* For You */}
    <h1
      onClick={forYouHandler}
      className={`font-semibold cursor-pointer pb-1 transition-colors duration-200
        ${isActive
          ? "text-black border-b-2 border-blue-500"
          : "text-gray-500 hover:text-black"}
      `}
    >
      For You
    </h1>

    {/* Following */}
    <h1
      onClick={followingHandler}
      className={`font-semibold cursor-pointer pb-1 transition-colors duration-200
        ${!isActive
          ? "text-black border-b-2 border-blue-500"
          : "text-gray-500 hover:text-black"}
      `}
    >
      Following
    </h1>

  </div>
</div>


      {/*  Post Section */}
      <div className="flex flex-col border-b border-gray-200">
        <div className="flex items-start p-4 space-x-3">
          <Avatar
            src="https://mui.com/static/images/avatar/1.jpg"
            size="50"
            round={true}
          />
          <input value={description} onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="What is happening?!"
            className="flex-1 border-none outline-none text-lg bg-transparent"
          />
        </div>

        {/* Post Button */}
       <div className="flex items-center justify-between px-4 pb-3">
 
  <div className="flex items-center space-x-3 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors duration-200">
    <CiImageOn size={24} />
  </div>

  <button onClick={submitHandler} className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-blue-600 active:scale-95 transition-all duration-200">
    Post
  </button>
</div>

      </div>
    </div>
  );
};

export default CreatePost;
