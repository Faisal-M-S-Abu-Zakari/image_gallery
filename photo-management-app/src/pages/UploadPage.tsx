import React from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/ UploadForm";
import "../styles/upload.css";

const UploadPage: React.FC = () => {
  return (
    <div className="upload-page">
      <Navbar />
      <main>
        <UploadForm />
      </main>
    </div>
  );
};

export default UploadPage;
