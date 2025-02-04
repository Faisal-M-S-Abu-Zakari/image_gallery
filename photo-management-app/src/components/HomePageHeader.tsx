import React from "react";
import { Link } from "react-router-dom";
const HomePageHeader: React.FC = () => {
  return (
    <header className="bg-[#2A2F45] text-white h-[20vh] !px-16 ">
      {/* Navbar */}
      <div className="flex justify-between items-center !py-1 ">
        <div className="text-2xl font-serif  tracking-wide flex justify-center items-center">
          <img className="w-[50px]" src="/public/image.png" />
          SnapShare
        </div>
        <nav className="flex items-center space-x-4">
          <Link to={"/login"} className="text-white text-lg  !px-5 !py-2">
            Log in
          </Link>
          <Link
            to={"/register"}
            className="bg-[#1C1F30] text-white !px-5 !py-2 rounded-lg shadow-md font-medium hover:bg-gray-200 hover:text-[#1C1F30] transition"
          >
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Header Content */}
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-serif ">Image Gallery</h1>
        <p className=" text-yellow-400 text-lg !mt-4 font-sans">
          Home
          <span className="text-lg text-white mt-2 font-sans">/Gallery</span>
        </p>
      </div>
    </header>
  );
};

export default HomePageHeader;
