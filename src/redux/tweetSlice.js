import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
    name: 'tweet',
    initialState: {
        tweets: [],
        refresh: false,
        isActive:true
    },
    reducers: {
        getAllTweets: (state, action) => {
    const tweets = action.payload;

    // Remove duplicates based on _id
    const uniqueTweets = Array.from(
        new Map(tweets.map(t => [t._id, t])).values()
    );

    state.tweets = uniqueTweets;
},

        getRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        getIsActive:(state,action)=>{
            state.isActive=action.payload;
        }
    } 
});

export const { getAllTweets, getRefresh,getIsActive } = tweetSlice.actions;
export default tweetSlice.reducer;
