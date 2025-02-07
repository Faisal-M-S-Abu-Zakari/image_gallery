import React, { useState } from "react";
import "../styles/upload.css";

const UploadForm: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    { image: string; status: string }[]
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files);

      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...imageUrls]);

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

  return (
    <section className="upload-section">
      <h2 className="upload-title">Upload Photos</h2>

      <div className="upload-box">
        <label className="upload-button">
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

      <div className="selected-images">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((imgSrc, index) => (
            <div key={index} className="selected-image-card">
              <img
                src={imgSrc}
                alt={`Uploaded ${index + 1}`}
                className="image-preview"
              />
            </div>
          ))
        ) : (
          <p className="no-images-text">No images uploaded yet.</p>
        )}
      </div>

      <div className="tagging-section">
        <h3>Tagging Options</h3>
        <input
          type="text"
          placeholder="Type tags here..."
          className="tag-input"
        />
        <div className="tags">
          <span>Nature</span>
          <span>Travel</span>
          <span>Family</span>
          <span className="red-tag">Work</span>
          <span className="yellow-tag">Hobbies</span>
        </div>
      </div>

      <div className="upload-status">
        <h3>Upload Photos</h3>
        {uploadStatus.map((file, index) => (
          <p
            key={index}
            className={file.status === "Failed" ? "error" : "success"}
          >
            {file.image} - {file.status}
          </p>
        ))}
      </div>
    </section>
  );
};

export default UploadForm;
