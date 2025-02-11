import Navbar from "../components/Navbar";
import GalleryImage from "./../components/GalleryImage";

const GalleyPage = () => {
  return (
    <div className="min-h-screen  w-lvw">
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <main className=" h-[90vh] overflow-auto ">
        <GalleryImage />
      </main>
    </div>
  );
};

export default GalleyPage;
