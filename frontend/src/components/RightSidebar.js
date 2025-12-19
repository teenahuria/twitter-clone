import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[30%] px-5 mt-3 sticky top-0">
      
      {/* 🔍 Search Bar */}
      <div className="relative mt-2">
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="Search"
        />
      </div>

      {/* 👥 Who to Follow */}
      <div className="bg-gray-50 rounded-2xl mt-5 p-2 border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold mb-4 text-gray-900">Who to follow</h1>

        {(otherUsers ?? []).map((user) => (
          <div
            key={user?._id}
            className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-xl transition duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Avatar
                src={user?.profilePic || "https://mui.com/static/images/avatar/1.jpg"}
                size="40"
                round={true}
              />
              <div>
                <h1 className="font-semibold text-gray-900 text-sm leading-tight">
                  {user?.name}
                </h1>
                <p className="text-sm text-gray-500">@{user?.username}</p>
              </div>
            </div>

            <Link to={`/profile/${user?._id}`}>
              <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-200">
                Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
