import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UploadForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; title: string; description: string; user: string }[]
  >([]);

  useEffect(() => {
    const savedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    setUploadedImages(savedImages);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        return {
          url: objectUrl,
          title: "",
          description: "",
          user: "",
        };
      });

      setUploadedImages((prevImages) => [...prevImages, ...newImages]);

      Swal.fire({
        title: "The image has been uploaded successfully!",
        icon: "success",
        draggable: true,
      });
    }
  };

  const handleMetadataChange = (
    index: number,
    key: "title" | "description" | "user",
    value: string
  ) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = { ...newImages[index], [key]: value };
      return newImages;
    });
  };

  return (
    <section className="flex flex-col h-full w-full !p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Upload Photos</h2>
      <div className="flex justify-center !mb-4">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 !p-4 bg-gray-100">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow !p-4 bg-white !h-90"
            >
              <img
                src={image.url}
                alt={image.title || `Uploaded ${index + 1}`}
                className="w-full !h-50 object-cover rounded-lg !mb-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={image.title}
                onChange={(e) =>
                  handleMetadataChange(index, "title", e.target.value)
                }
                className="w-full !p-2 border rounded text-sm !mb-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={image.description}
                onChange={(e) =>
                  handleMetadataChange(index, "description", e.target.value)
                }
                className="w-full !p-2 border rounded text-sm !mb-1"
              />
              <input
                type="text"
                placeholder="User"
                value={image.user}
                onChange={(e) =>
                  handleMetadataChange(index, "user", e.target.value)
                }
                className="w-full !p-2 border rounded text-sm"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No images uploaded yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default UploadForm;
