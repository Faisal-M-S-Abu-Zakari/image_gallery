import React from "react";

import { ImageGrid } from "./ImageGrid";
import { useImageUpload } from "../hooks/useImageUpload";
const UploadForm: React.FC = () => {
  const { uploadedImages, handleFileUpload, updateImageMetadata } =
    useImageUpload();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      handleFileUpload(files);
    }
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
        <ImageGrid
          images={uploadedImages}
          onMetadataChange={updateImageMetadata}
        />
      </div>
    </section>
  );
};
export default UploadForm;
