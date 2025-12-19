import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
const dispatch=useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default browser reload

    if (isLogin) {
      // Handle login logic
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {
          email,
          password,
        },{
          headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request
        }
      
      );
      dispatch(getUser(res?.data?.user));//redux action to store user in redux store
      navigate('/');
        if(res.data.success){
          toast.success(res.data.message);}
      } catch (error) {
        toast.success(error.response.data.message);
        console.error('Error during login:', error);
      }
    } else {
      // Handle signup logic
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, {
          name,
          username,
          email,
          password,
        },{
          headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies in the request
        }
      );
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);}
      } catch (error) {
        toast.success(error.response.data.message);
        console.error('Error during signup:', error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex bg-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
          alt="Twitter Logo"
          className="w-48 h-40 mb-6"
        />
        <h1 className="text-5xl font-bold text-black text-center leading-tight w-3/4">
          Happening now
        </h1>
        <h2 className="text-2xl font-semibold text-black mt-4">
          {isLogin ? 'Log in to your account.' : 'Join today.'}
        </h2>
      </div>

      
      <div className="w-1/2 flex flex-col justify-center items-center px-12">
        <div className="w-[380px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {isLogin ? 'Sign in to X' : 'Create your account'}
          </h2>

          
          <form onSubmit={submitHandler} className="flex flex-col space-y-4">
           
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />

            <button
              type="submit"
              className="bg-sky-500 text-white rounded-full px-6 py-3 w-full hover:bg-sky-600 transition duration-200 font-semibold"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500 text-sm">or</div>

          <p className="text-sm text-gray-600 text-center">
            {isLogin ? "Don’t have an account? " : "Already have an account? "}
            <span
              onClick={loginSignupHandler}
              className="text-sky-500 hover:underline cursor-pointer font-medium"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
