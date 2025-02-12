import React, { useState, useEffect } from "react";

const UploadForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    { image: string; status: string }[]
  >([]);
  const [metadata, setMetadata] = useState<
    { title: string; description: string; tags: string }[]
  >([]);
  // git data from localStorage , this will not help ...
  useEffect(() => {
    const savedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    const savedMetadata = JSON.parse(localStorage.getItem("metadata") || "[]");
    setUploadedImages(savedImages);
    setMetadata(savedMetadata);
  }, []);
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
    localStorage.setItem("metadata", JSON.stringify(metadata));
  }, [uploadedImages, metadata]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...imageUrls]);
      setMetadata([
        ...metadata,
        ...files.map(() => ({ title: "", description: "", tags: "" })),
      ]);

      setUploadStatus(
        files.map((file) => ({ image: file.name, status: "Uploading..." }))
      );

      setTimeout(() => {
        setUploadStatus((prev) =>
          prev.map((file) => ({
            ...file,
            status: Math.random() > 0.8 ? "Failed" : "Uploaded Successfully",
          }))
        );
      }, 2000);
    }
  };
  const handleMetadataChange = (index: number, key: string, value: string) => {
    const newMetadata = [...metadata];
    newMetadata[index] = { ...newMetadata[index], [key]: value };
    setMetadata(newMetadata);
  };

  return (
    <section className="flex flex-col h-full w-full !p-1 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 !pl-1.5 ">
        Upload Photos
      </h2>
      <div className="flex justify-center !pb-2">
        <label className="bg-blue-500 text-xl text-white !py-2 !px-6 rounded cursor-pointer hover:bg-blue-700 transition">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          Upload Images
        </label>
      </div>
      <div className="flex-1 overflow-auto grid grid-cols-2 md:grid-cols-4 gap-4 !p-4 bg-gray-100 ">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((imgSrc, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow !p-4 bg-white !h-70"
            >
              <img
                src={imgSrc}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={metadata[index]?.title || ""}
                onChange={(e) =>
                  handleMetadataChange(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Description"
                value={metadata[index]?.description || ""}
                onChange={(e) =>
                  handleMetadataChange(index, "description", e.target.value)
                }
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={metadata[index]?.tags || ""}
                onChange={(e) =>
                  handleMetadataChange(index, "tags", e.target.value)
                }
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center flex items-center justify-center h-full col-span-full">
            No images uploaded yet.
          </p>
        )}
      </div>
      <div className="mt-4 !p-2">
        <h3 className="font-medium !mb-2">Upload Status</h3>
        {uploadStatus.map((file, index) => (
          <p
            key={index}
            className={
              file.status === "Failed" ? "text-red-500" : "text-green-500"
            }
          >
            {file.image} - {file.status}
          </p>
        ))}
      </div>
    </section>
  );
};

export default UploadForm;
