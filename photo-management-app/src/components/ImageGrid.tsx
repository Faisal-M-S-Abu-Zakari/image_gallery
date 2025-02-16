import React from "react";
import { ImageCard } from "./ImageCard";
import { ImageGridProps } from "../types";

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onMetadataChange,
}) => {
  if (images.length === 0) {
    return (
      <p className="text-gray-500 text-center col-span-full">
        No images uploaded yet.
      </p>
    );
  }
  return (
    <>
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          index={index}
          onMetadataChange={onMetadataChange}
        />
      ))}
    </>
  );
};
