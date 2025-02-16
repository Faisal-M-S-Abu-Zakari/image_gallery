import React from "react";
import { Grid, CardMedia, Box, Checkbox } from "@mui/material";
import { type Photo } from "../hooks/useAlbums";
interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: Set<number>;
  onPhotoSelect: (photoId: number) => void;
}
export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  selectedPhotos,
  onPhotoSelect,
}) => {
  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item key={photo.id} xs={12} sm={6} md={4}>
          <Box
            sx={{
              position: "relative",
              "&:hover": {
                "& .photo-overlay": {
                  opacity: 1,
                },
              },
            }}
          >
            <CardMedia
              component="img"
              image={
                photo.displayUrl ||
                photo.url ||
                "https://via.placeholder.com/150"
              }
              alt="Album Photo"
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 1,
                border: selectedPhotos.has(photo.id)
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
              }}
              onClick={() => onPhotoSelect(photo.id)}
            />
            <Box
              className="photo-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                opacity: 0,
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={selectedPhotos.has(photo.id)}
                onChange={() => onPhotoSelect(photo.id)}
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
