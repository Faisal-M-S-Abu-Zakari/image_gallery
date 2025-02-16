import React from "react";
import { Grid, CardMedia, Box, Checkbox } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { type Photo } from "../types";

interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: Set<number>;
  onPhotoSelect: (photoId: number) => void;
  onReorder: (newPhotos: Photo[]) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  selectedPhotos,
  onPhotoSelect,
  onReorder,
}) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedPhotos = Array.from(photos);
    const [movedPhoto] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, movedPhoto);
    onReorder(reorderedPhotos);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="photo-grid" direction="horizontal">
        {(provided) => (
          <Grid
            container
            spacing={2}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {photos.map((photo, index) => (
              <Draggable
                key={photo.id.toString()}
                draggableId={photo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        "&:hover .photo-overlay": {
                          opacity: 1,
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
                          sx={{
                            color: "white",
                            "&.Mui-checked": { color: "white" },
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};
