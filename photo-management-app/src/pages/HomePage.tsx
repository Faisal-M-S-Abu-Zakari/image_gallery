import React from 'react'
import HomePageHeader from '../components/HomePageHeader.tsx';

const HomePage: React.FC = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        <HomePageHeader />
       
        <section className="grid grid-cols-1 md:grid-cols-2  h-[70vh]">
          <div className="bg-white !p-8 ">
            <h2 className="text-5xl font-sans mb-4">WEBSITE </h2>
            <h2 className="text-5xl font-sans !ml-15 !mb-12"> GALLERY</h2>

            <p className="text-black text-lg font-sans">
              Welcome to our Image Gallery, your easy destination for discovering a
              variety of stunning images. From breathtaking landscapes to captivating
              portraits, our curated collection makes it simple to find the visuals
              that inspire you. Dive in and explore the beauty of art at your
              fingertips!
            </p>
            <p className="!mt-6 !ml-3 text-3xl  font-sans">Your journey into creativity </p>
            <p className="mt-6 text-3xl  font-sans">begins here!</p>

          </div>
          <div>
            <img
              src="/public/image2.png" 
              alt="Gallery Wall"
              className=" shadow-lg w-full bg-cover bg-center h-full rounded-lg"
            
            />
          </div>
        </section>
      </div>
    );
  };

export default HomePage