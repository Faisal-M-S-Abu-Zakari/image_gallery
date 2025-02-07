import React from "react";
import "../styles/upload.css";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <h1 className="logo">SnapShare</h1>
      <nav>
        <a href="#">Upload</a>
        <a href="#">Gallery</a>
        <a href="#">Image Preview</a>
      </nav>
      <div className="user-info">
        <p>Hello Stranger</p>
        <button className="logout-btn">Log Out</button>
      </div>
    </header>
  );
};

export default Navbar;
