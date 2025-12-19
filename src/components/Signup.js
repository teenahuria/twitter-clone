import React from 'react';

const Signup = () => {
  return (
    <div className="w-screen h-screen flex bg-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
          alt="Twitter Logo"
          className="w-36 h-36 mb-6"
        />
        <h1 className="text-5xl font-bold text-black text-center leading-tight w-3/4">
          Happening now
        </h1>
        <h2 className="text-2xl font-semibold text-black mt-4">
          Join today.
        </h2>
      </div>

      {/* Right Section (Form) */}
      <div className="w-1/2 flex flex-col justify-center items-center px-12">
        <div className="w-[380px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Create your account
          </h2>

          {/* Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-full px-4 py-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />

            <button
              type="submit"
              className="bg-sky-500 text-white rounded-full px-6 py-3 w-full hover:bg-sky-600 transition duration-200 font-semibold"
            >
              Sign Up
            </button>
          </form>


          <div className="my-6 text-center text-gray-500 text-sm">or</div>

   
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <span className="text-sky-500 hover:underline cursor-pointer font-medium">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
