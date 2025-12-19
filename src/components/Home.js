import React,{useEffect} from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Outlet,useNavigate } from 'react-router-dom';
import useOtherUser from './hooks/useOtherUser.js';
import useGetMyTweets from './hooks/useGetMyTweets.js';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
const navigate=useNavigate();
useEffect(() => {
if(!user){
  navigate("/login");
}
}, [])
  const userId = user?._id;

  // Always call hooks at the top-level.
  useOtherUser(userId);
  useGetMyTweets(userId);

  if (!userId) return null; // or a loader

  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;



//like i have LeftSidebar and RightSidebar in Home component and Feed is rendered in between them based on the route using Outlet.so
//when the route is /home ,Feed component will be rendered in place of Outlet in Home component.and when the route is /profile,Profile component will be rendered in place of Outlet in Home component.

//Outlet is a component provided by react-router-dom that serves as a placeholder for rendering child routes within a parent route component.