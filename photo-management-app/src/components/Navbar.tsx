import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUserName(loggedInUser.trim().replace(/"/g, ""));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUserName(null);
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-[#2A2F45] text-white shadow-md !p-3">
      <div className="flex items-center space-x-3 text-2xl font-serif tracking-wide">
        <img className="w-8 h-8" src="/public/image.png" alt="Logo" />
        <span>SnapShare</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex !space-x-12 text-lg font-medium">
        <Link
          to="/upload"
          className="relative hover: transition after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Upload
        </Link>
        <Link
          to="/gallery"
          className="relative hover: transition after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Gallery
        </Link>
        <Link
          to="/albums"
          className="relative hover: transition after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Albums
        </Link>
      </nav>

      {/* User Section */}
      <div className="flex items-center !space-x-8">
        <p className="text-l">
          Welcome {userName ? `, ${userName.toUpperCase()}` : "back!"}
        </p>
        <button
          className="bg-[#1C1F30] text-white !px-5 !py-2 rounded-lg shadow-md font-medium cursor-pointer hover:bg-gray-200 hover:text-[#1C1F30] transition"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
