import { useState, useEffect } from "react";
import { UploadedImage } from "../types";
import Swal from "sweetalert2";
export const useImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  useEffect(() => {
    const savedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    setUploadedImages(savedImages);
  }, []);
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleFileUpload = async (files: File[]) => {
    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          const objectUrl = URL.createObjectURL(file);
          const base64 = await convertToBase64(file);
          return {
            url: objectUrl,
            base64,
            title: "",
            description: "",
            user: "",
          };
        })
      );
      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
      Swal.fire({
        title: "The image has been uploaded successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        title: "Error uploading images",
        icon: "error",
        text: "Please try again",
      });
    }
  };
  const updateImageMetadata = (
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
  return {
    uploadedImages,
    handleFileUpload,
    updateImageMetadata,
  };
};
