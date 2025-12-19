import { useEffect } from 'react';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getAllTweets } from '../../redux/tweetSlice.js';
import { useSelector } from 'react-redux';

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const {refresh,isActive}=useSelector(store=>store.tweet);

  
    const fetchMyTweets = async () => {
      try {
        const res = await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log("API Response:", res.data); //  Debug line
        dispatch(getAllTweets(res.data.tweets)); //  Dispatch to Redux
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

   const followingTweetHandler= async()=>{
      try {
        axios.defaults.withCredentials=true;
        const res=await axios.get(`${TWEET_API_END_POINT}/followingtweet/${id}`);
        console.log(res);
        dispatch(getAllTweets(res.data.tweets));
     
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  useEffect(() => {
  if (!id) return;       //  Prevent API call when id is undefined

  if (isActive) {
    fetchMyTweets();
  } else {
    followingTweetHandler();
  }
}, [id, isActive, refresh]);   // 🔥 also include id

};

export default useGetMyTweets;
