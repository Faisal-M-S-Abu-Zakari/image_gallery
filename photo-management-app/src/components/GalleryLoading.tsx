const GalleryLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="relative w-full max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full h-56 bg-gray-200" />
          <div className="absolute bottom-0 w-full p-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryLoading;
