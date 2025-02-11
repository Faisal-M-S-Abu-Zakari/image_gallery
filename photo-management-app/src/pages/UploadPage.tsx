import React from "react";
import Navbar from "../components/Navbar";
import UploadForm from "../components/ UploadForm";
// import "../styles/upload.css";

const UploadPage: React.FC = () => {
  return (
    <div className="min-h-screen  w-lvw">
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <main className=" h-[90vh] ">
        <UploadForm />
      </main>
    </div>
  );
};

export default UploadPage;
