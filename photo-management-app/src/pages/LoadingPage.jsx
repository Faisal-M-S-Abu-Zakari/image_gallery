import React from "react";
import logo from "../../public/image.png";
import "./Loading.css";
const LoadingPage = () => {
  return (
    <div className="loading-container">
      <img src={logo} />
      <div className="loader"></div>
    </div>
  );
};

export default LoadingPage;
