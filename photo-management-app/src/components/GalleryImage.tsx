import { useState, useEffect } from "react";
import { useGallery } from "../hooks/useGallery";
import ImageModal from "./ImageModal";
import GalleryFilters from "./GalleryFilters";
import GalleryLoading from "./GalleryLoading";

type UploadedImage = {
  url: string;
  title: string;
  description: string;
  user: string;
};

const GalleryImage = () => {
  const {
    open,
    selectedPhoto,
    viewMode,
    sortOrder,
    sortBy,
    filteredPhotos,
    isLoading,
    searchParams,
    setOpen,
    handleType,
    handleSize,
    handleSearch,
    handleImageClick,
    toggleSortOrder,
    setViewMode,
    setSortBy,
  } = useGallery();

  // State for uploaded images with explicit type
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]") as UploadedImage[];
    setUploadedImages(Array.isArray(savedImages) ? savedImages : []);
  }, []);

  // Combine API images with uploaded images
  const allPhotos = [
    ...uploadedImages.map((image) => ({
      displayUrl: image.url,
      alt_description: image.title || "Uploaded Image",
      title: image.title || "Uploaded Image",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
    ...filteredPhotos,
  ];

  return (
    <div className="!p-6 h-[90vh] bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 text-center !mb-6">
        Photo Gallery
      </h2>

      <GalleryFilters
        handleType={handleType}
        handleSize={handleSize}
        handleSearch={handleSearch}
        setSortBy={setSortBy}
        toggleSortOrder={toggleSortOrder}
        setViewMode={setViewMode}
        typeValue={searchParams.get("Type") || ""}
        sortBy={sortBy}
        sortOrder={sortOrder}
        viewMode={viewMode}
      />

      <div
        className={`container min-h-[60vh] mx-auto ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            : "flex flex-col gap-4 w-full"
        } place-items-center !p-4 pb-10`}
      >
        {isLoading ? (
          <GalleryLoading />
        ) : allPhotos.length > 0 ? (
          allPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(photo)}
              className={`relative group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                viewMode === "grid"
                  ? "w-full max-w-[300px]"
                  : "w-full flex items-center gap-4 !p-4"
              }`}
            >
              <img
                src={photo.displayUrl}
                alt={photo.alt_description || "Gallery Image"}
                className={`${
                  viewMode === "grid"
                    ? "w-full h-56 object-cover"
                    : "w-48 h-32 object-cover rounded-md"
                } transition-transform duration-300 transform group-hover:scale-105`}
              />
              <div
                className={`${
                  viewMode === "grid"
                    ? "absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                    : "flex-1"
                } transition-opacity duration-300 flex flex-col justify-end !p-3 text-${
                  viewMode === "grid" ? "white" : "gray-800"
                }`}
              >
                <p className="text-sm font-semibold">{photo.alt_description}</p>
                {viewMode === "list" && (
                  <div className="!mt-2 text-sm text-gray-500">
                    <p>
                      Created: {new Date(photo.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Updated: {new Date(photo.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-center text-gray-700">No images found.</p>
          </div>
        )}
      </div>

      <ImageModal
        open={open}
        onClose={() => setOpen(false)}
        selectedPhoto={selectedPhoto}
      />
    </div>
  );
};

export default GalleryImage;
