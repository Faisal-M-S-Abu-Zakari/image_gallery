import React from "react";
import { ImageCardProps } from "../types";

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  index,
  onMetadataChange,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow !p-4 bg-white !h-90">
      <img
        src={image.url}
        alt={image.title || `Uploaded ${index + 1}`}
        className="w-full !h-50 object-cover rounded-lg !mb-2"
      />
      <input
        type="text"
        placeholder="Title"
        value={image.title}
        onChange={(e) => onMetadataChange(index, "title", e.target.value)}
        className="w-full !p-2 border rounded text-sm !mb-1"
      />
      <input
        type="text"
        placeholder="Description"
        value={image.description}
        onChange={(e) => onMetadataChange(index, "description", e.target.value)}
        className="w-full !p-2 border rounded text-sm !mb-1"
      />
      <input
        type="text"
        placeholder="User"
        value={image.user}
        onChange={(e) => onMetadataChange(index, "user", e.target.value)}
        className="w-full !p-2 border rounded text-sm"
      />
    </div>
  );
};
