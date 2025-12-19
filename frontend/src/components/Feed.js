import React from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet.js';
import { useSelector } from 'react-redux';

const Feed = () => {
  const {tweets}=useSelector(store=>store.tweet);

  return (
    <div className="w-[50%] border-x border-gray-300 min-h-screen">
      <CreatePost />
      {tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)}
      {/* <Tweet/> */}
    
    </div>
  );
};

export default Feed;
