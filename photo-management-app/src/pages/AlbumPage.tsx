import Navbar from "../components/Navbar";
import Album from "./../components/Album";

const AlbumsPage = () => {
  return (
    <div className="min-h-screen  w-lvw">
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <main className=" h-[90vh] overflow-auto ">
        <Album />
      </main>
    </div>
  );
};
//change
export default AlbumsPage;
