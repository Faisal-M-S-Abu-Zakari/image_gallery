import { useState, useEffect } from "react";
import "./modal.css"; // Import custom CSS for modal overlay
import Select from "react-select";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Avatar } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

const accessKey = "yV2m_rhcRv8dfOGOA7uguPjkusei1k4kpqbZXVxpPNc";

const GalleryImage = () => {
  const [Photos, setPhotos] = useState<any[]>([]);
  const [FilteredPhotos, setFilteredPhotos] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [param, setParam] = useSearchParams();
  useEffect(() => {
    fetchPhotos();
  }, [param]); // Fetch photos whenever the search parameters change

  useEffect(() => {
    filterPhotos();
  }, [Photos]); // Filter photos whenever new photos are fetched
  const fetchPhotos = async () => {
    const searchCategory = param.get("Search") || "animal";
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchCategory}&page=1&per_page=30&client_id=${accessKey}`
      );
      const data = await res.json();
      console.log(data.results);
      setPhotos(data.results);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };
  const filterPhotos = () => {
    const type = param.get("Type");
    const size = param.get("Size");

    let filtered = Photos;

    // Filter by type (JPEG or PNG)
    if (type === "jpeg") {
      filtered = filtered.filter((photo) => photo.urls.full.includes("jpg"));
    } else if (type === "png") {
      filtered = filtered.filter((photo) => photo.urls.full.includes("png"));
    }

    // Filter by size
    if (size === "small") {
      filtered = filtered.map((photo) => ({
        ...photo,
        displayUrl: photo.urls.small,
      }));
    } else if (size === "regular") {
      filtered = filtered.map((photo) => ({
        ...photo,
        displayUrl: photo.urls.regular,
      }));
    } else if (size === "full") {
      filtered = filtered.map((photo) => ({
        ...photo,
        displayUrl: photo.urls.full,
      }));
    } else {
      // If "all" size is selected, reset to use the default size (small)
      filtered = filtered.map((photo) => ({
        ...photo,
        displayUrl: photo.urls.small,
      }));
    }

    setFilteredPhotos(filtered);
  };
  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = e.target.value;
    if (query === "all") {
      param.delete("Type");
    } else {
      param.set("Type", query);
    }
    setParam(param);
  };
  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size === "all") {
      param.delete("Size");
    } else {
      param.set("Size", size);
    }
    setParam(param);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query === "") {
      param.delete("Search");
    } else {
      param.set("Search", query);
    }
    setParam(param);
  };
  const handleImageClick = (photo: any) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const options = [
    { value: "upload", label: "Upload Date" },
    { value: "taken", label: "Taken Date" },
  ];

  return (
    <div className=" !p-6 h-[90vh] ">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Photo Gallery
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-6 !p-3">
        {/* <Select options={options} placeholder="Select filter" /> */}
        <select onChange={handleType} value={param.get("Type") || ""}>
          <option value="all">All</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>

        <select onChange={handleSize}>
          <option value="all">All Sizes</option>
          <option value="small">Small</option>
          <option value="regular">Medium</option>
          <option value="full">Large</option>
        </select>
        <input
          type="text"
          placeholder="Search images..."
          className="px-3 py-2 border rounded-md shadow-sm"
          onChange={handleSearch}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
          Toggle View
        </button>
      </div>

      <div className="container min-h-[60vh] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center p-4 !pb-10">
        {FilteredPhotos.length > 0 ? (
          FilteredPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(photo)}
              className="relative w-full max-w-[300px] group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <img
                src={photo.displayUrl}
                alt={photo.alt_description || "Gallery Image"}
                className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <p className="text-sm font-semibold">{photo.alt_description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-center text-black">No images found.</p>
          </div>
        )}
      </div>

      {/* Improved Modal with MUI Joy */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(5px)", // Blurred background
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 1200,

            p: 4,
            boxShadow: "xl",
            backgroundColor: "white",
            width: "90%",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1, color: "gray" }} />

          {/* Title */}
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              color: "black",
            }}
          >
            Image Details
          </Typography>

          {/* Image and Details Layout */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Image Section */}
            <div className="w-full sm:w-1/2 flex justify-center">
              <img
                src={selectedPhoto?.displayUrl}
                alt={selectedPhoto?.alt_description || "Gallery Image"}
                className="w-full h-[400px] object-cover   rounded-lg shadow-md"
              />
            </div>

            {/* Details Section */}
            <div className="w-full sm:w-1/2 flex flex-col !space-y-8 !mx-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedPhoto?.user.profile_image.medium}
                  alt={selectedPhoto?.user.name}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography level="body-lg" fontWeight="bold">
                  <a
                    href={selectedPhoto?.user.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selectedPhoto?.user.name}
                  </a>
                </Typography>
              </div>
              <Typography level="body-lg" fontWeight="bold">
                {selectedPhoto?.alt_description || "No Title"}
              </Typography>

              <Typography level="body-md" textColor="text.secondary">
                {selectedPhoto?.description || "No Description Available"}
              </Typography>

              {/* Filter Dropdown */}
              <Button
                variant="solid"
                color="primary"
                onClick={() => window.open(selectedPhoto?.links.html, "_blank")}
                sx={{ mt: 2 }}
              >
                ADD TO ALBUM
              </Button>
              <Select options={options} placeholder="Sort by" />

              {/* View Full Image Button */}
            </div>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default GalleryImage;
