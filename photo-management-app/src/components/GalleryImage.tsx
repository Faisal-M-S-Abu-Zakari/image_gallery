import { useState, useEffect } from "react";
const accessKey = "yV2m_rhcRv8dfOGOA7uguPjkusei1k4kpqbZXVxpPNc";
const GalleryImage = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetchPhotos();
  }, []);
  //   fetch all Photos
  const fetchPhotos = async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=30`
    );
    const data = await res.json();
    console.log(data);
    setFilteredPhotos(data);
  };
  return (
    <div className="  bg-gray-100 !p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Photo Gallery
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-6 !p-3">
        <select>
          <option value="upload">Upload Date</option>
          <option value="taken">Taken Date</option>
        </select>

        {/* Type Filter */}
        <select>
          <option value="all">All Formats</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>

        {/* Size Filter */}
        <select>
          <option value="all">All Sizes</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        {/* Sort Order */}
        <select>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <input
          type="text"
          placeholder="Search images..."
          className="px-3 py-2 border rounded-md shadow-sm"
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
          Toggle View
        </button>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center p-4">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative w-full max-w-[300px] group bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Gallery Image"}
                className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <p className="text-sm font-semibold">{photo.alt_description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white col-span-full">
            No images found.
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryImage;
