import { useState, useEffect } from "react";
import Select from "react-select";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Avatar } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

// TypeScript Interfaces
interface PhotoUrls {
  full: string;
  regular: string;
  small: string;
}

interface UserProfile {
  name: string;
  profile_image: {
    medium: string;
  };
  links: {
    html: string;
  };
}

interface PhotoTag {
  title: string;
}

interface Photo {
  id: string;
  urls: PhotoUrls;
  alt_description: string;
  description: string;
  user: UserProfile;
  tags: PhotoTag[];
  links: {
    html: string;
  };
  displayUrl?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const ACCESS_KEY = "yV2m_rhcRv8dfOGOA7uguPjkusei1k4kpqbZXVxpPNc";

const GalleryImage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [param, setParam] = useSearchParams();
  const [searchText, setSearchText] = useState(param.get("Search") || "");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const filterOptions: SelectOption[] = [
    { value: "upload", label: "Upload Date" },
    { value: "taken", label: "Taken Date" },
  ];

  useEffect(() => {
    fetchPhotos();
  }, [param.get("Type")]); // Refetch when type changes

  useEffect(() => {
    filterPhotos();
  }, [param, photos]);

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (searchText.trim() === "") {
        param.delete("Search");
      } else {
        param.set("Search", searchText);
      }
      setParam(param);
    }, 500);

    return () => clearTimeout(searchDebounce);
  }, [searchText, param, setParam]);

  const getImageType = (url: string): string => {
    const extension = url.split("?")[0].split(".").pop()?.toLowerCase() || "";
    return extension;
  };

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const category = param.get("Category") || "nature";
      const searchQuery = param.get("Search") || "";
      const type = param.get("Type");

      let url = `https://api.unsplash.com/search/photos?query=${category}&page=${page}&per_page=30`;

      // Add type-specific parameters
      if (type === "png") {
        url += "&filter=png";
      }

      const response = await fetch(`${url}&client_id=${ACCESS_KEY}`);
      const data = await response.json();

      if (data.results) {
        let filtered = data.results;

        if (searchQuery) {
          filtered = filtered.filter((photo: Photo) =>
            photo.tags.some((tag) =>
              tag.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }

        setPhotos(filtered);
      } else {
        console.error("Unexpected API response:", data);
        setPhotos([]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterPhotos = () => {
    if (!photos.length) {
      setFilteredPhotos([]);
      return;
    }

    const type = param.get("Type");
    const size = param.get("Size");
    const search = param.get("Search")?.toLowerCase() || "";

    let filtered = [...photos];

    // Improved type filtering
    if (type && type !== "all") {
      filtered = filtered.filter((photo) => {
        const imageType = getImageType(photo.urls.full);
        if (type === "jpeg") {
          return imageType === "jpg" || imageType === "jpeg";
        } else if (type === "png") {
          return imageType === "png";
        }
        return true;
      });
    }

    // Apply size and create displayUrl
    filtered = filtered.map((photo) => ({
      ...photo,
      displayUrl: getPhotoUrlBySize(photo.urls, size),
    }));

    // Filter by search query
    if (search) {
      filtered = filtered.filter(
        (photo) =>
          photo.alt_description?.toLowerCase()?.includes(search) ||
          photo.description?.toLowerCase()?.includes(search)
      );
    }

    setFilteredPhotos(filtered);
  };

  const getPhotoUrlBySize = (urls: PhotoUrls, size: string | null): string => {
    switch (size) {
      case "small":
        return urls.small;
      case "regular":
        return urls.regular;
      case "full":
        return urls.full;
      default:
        return urls.small;
    }
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleImageClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchPhotos();
  };

  return (
    <div className="p-6 h-[90vh]">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Photo Gallery
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-6 p-3">
        <select
          onChange={handleType}
          value={param.get("Type") || "all"}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
        </select>

        <select
          onChange={handleSize}
          value={param.get("Size") || "all"}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Sizes</option>
          <option value="small">Small</option>
          <option value="regular">Medium</option>
          <option value="full">Large</option>
        </select>

        <input
          type="text"
          placeholder="Search images..."
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>

      {loading && filteredPhotos.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <>
          <div className="container min-h-[60vh] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center p-4 pb-10">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => handleImageClick(photo)}
                  className="relative w-full max-w-[300px] group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={photo.displayUrl}
                    alt={photo.alt_description || "Gallery Image"}
                    className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                    <p className="text-sm font-semibold">
                      {photo.alt_description}
                    </p>
                    <p className="text-xs mt-1">
                      Type: {getImageType(photo.urls.full).toUpperCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center col-span-full h-full">
                <p className="text-center text-gray-500">No images found.</p>
              </div>
            )}
          </div>

          {filteredPhotos.length > 0 && (
            <div className="flex justify-center mt-4 mb-8">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

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
              <Select options={filterOptions} placeholder="Sort by" />

              {/* View Full Image Button */}
            </div>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default GalleryImage;
