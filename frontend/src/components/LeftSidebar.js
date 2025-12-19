import React from "react";
import { FaHome } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa"; // Explore
import { FaBell } from "react-icons/fa"; // Notifications
import { FaUser } from "react-icons/fa"; // Profile
import { FaBookmark } from "react-icons/fa"; // Bookmarks
import { FaSignOutAlt } from "react-icons/fa"; // Logout
import { Link ,useNavigate} from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { USER_API_END_POINT } from "./utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {

  const {user}=useSelector(store=>store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const logoutHandler=async()=>{
    try {
      const res=await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
       navigate('/login');
      toast.success(res.data.message);
     
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      
      
    }
  }
  return (
    <div className='w-[20%] flex flex-col justify-between h-screen p-4 sticky top-0'>
      <div>
        <div>
          <div className="flex justify-center mb-4 mt-4">
            <div className="flex justify-center">
              <img
                src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/twitter-x-1fhy50xzcvkl246hf5ua4.png/twitter-x-jyw81k7vr85ry57c7ym2d.png?_a=DATAg1AAZAA0"
                alt="twitter-logo"
                className="w-12 h-12 rounded-full p-3 hover:bg-gray-100 transition-all duration-200 ease-in-out shadow-sm cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <div>
              <FaHome size={"24px"} />
            </div>
            <Link to="/" className="font-bold text-lg">Home</Link>
          </div>

          <div className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <div>
              <FaHashtag size={"24px"} />
            </div>
            <h1 className="font-bold text-lg">Explore</h1>
          </div>

          <div className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <div>
              <FaBell size={"24px"} />
            </div>
            <h1 className="font-bold text-lg">Notifications</h1>
          </div>

          <div className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <div>
              <FaUser size={"24px"} />
            </div>
            <Link to={`/profile/${user?._id}`} className="font-bold text-lg">Profile</Link>
          </div>

        <div className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
  <div>
    <FaBookmark size={"24px"} />
  </div>
  <Link to="/bookmarks" className="font-bold text-lg">Bookmarks</Link>
</div>


          <div onClick={logoutHandler} className="flex items-center gap-4 my-2 p-2 hover:bg-gray-200 rounded-full cursor-pointer">
            <div>
              <FaSignOutAlt size={"24px"} />
            </div>
            <h1 className="font-bold text-lg">Logout</h1>
          </div>

          <button className="w-36 mt-4 bg-blue-500 text-white font-semibold rounded-full py-2 shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 active:scale-95">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
