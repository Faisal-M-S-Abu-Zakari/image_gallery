import React from "react";
import HomePageHeader from "../components/HomePageHeader.tsx";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HomePageHeader />



  
      <section className="grid grid-cols-1 md:grid-cols-2  h-[80vh]  ">
        <div className="bg-white !p-8 flex flex-col justify-between items-start">
          <h2 className="text-6xl font-bold text-gray-800 mb-4">
            WEBSITE <br />
            <h2 className="text-6xl font-bold text-[#1C1F30] !pl-17">
              {" "}
              GALLERY
            </h2>
          </h2>

          <p className="text-gray-700 text-lg font-sans mb-4 leading-relaxed">
            Welcome to our Image Gallery, your easy destination for discovering
            a variety of stunning images. From breathtaking landscapes to
            captivating portraits, our curated collection makes it simple to
            find the visuals that inspire you. Dive in and explore the beauty of
            art at your fingertips!
          </p>
          <p className="mt-6 text-2xl font-semibold text-gray-800">
            Your journey into creativity <br />
            begins here!
          </p>

          {/* Social Icons Section */}
          <div className="!mt-8 flex space-x-4 justify-around w-50">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare className="text-blue-600 text-3xl hover:text-blue-500 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitterSquare className="text-blue-400 text-3xl hover:text-blue-300 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare className="text-pink-600 text-3xl hover:text-pink-500 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700 text-3xl hover:text-blue-600 transition" />
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src="/public/image2.png"
            alt="Gallery Wall"
            className="shadow-lg w-full bg-cover bg-center h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1C1F30] opacity-50 mix-blend-overlay"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
