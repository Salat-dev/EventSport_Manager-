import React from "react";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">MyLogo</div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>

          {/* Buttons */}
          <div className="space-x-4">
            <button className="bg-transparent border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to My Website
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A place where your journey begins.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
