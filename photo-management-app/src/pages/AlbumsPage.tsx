import Navbar from "../components/Navbar";
import Albums from "./../components/Albums";

const AlbumsPage = () => {
  return (
    <div className="min-h-screen  w-lvw">
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <main className=" h-[90vh] overflow-auto ">
        <Albums />
      </main>
    </div>
  );
};
//change
export default AlbumsPage;
