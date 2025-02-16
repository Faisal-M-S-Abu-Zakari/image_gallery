import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/joy";
import Swal from "sweetalert2";
import { useAlbums } from "../hooks/useAlbums";
import { type Album, type Photo } from "../types";
import { AlbumCard } from "./AlbumCard";
import { PhotoGrid } from "./PhotoGrid";

const Albums: React.FC = () => {
  const {
    albums,
    createAlbum,
    deleteAlbum,
    updateAlbum,
    deletePhotosFromAlbum,
    deleteAllPhotosFromAlbum,
  } = useAlbums();
  const [openDialog, setOpenDialog] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [openAlbumView, setOpenAlbumView] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());

  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      createAlbum(newAlbumName);
      setNewAlbumName("");
      Swal.fire({
        title: "Album Added Successfully!",
        text: "You clicked the button!",
        icon: "success",
      });
      setOpenDialog(false);
    }
  };

  const handleSelectAllImages = () => {
    if (selectedPhotos.size === currentAlbum?.photos.length) {
      setSelectedPhotos(new Set());
    } else if (currentAlbum) {
      const allPhotoIds = new Set(
        currentAlbum?.photos.map((photo) => photo.id)
      );
      setSelectedPhotos(allPhotoIds);
    }
  };
  const handlePhotoSelect = (photoId: number) => {
    const newSelection = new Set(selectedPhotos);

    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotos(newSelection);
  };
  const handleReorderPhotos = (albumId: number, reorderedPhotos: Photo[]) => {
    if (currentAlbum) {
      updateAlbum({ ...currentAlbum, photos: reorderedPhotos });
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#003366",
          color: "white",
          display: "block",
          margin: "20px auto",
        }}
        onClick={() => {
          setCurrentAlbum(null);
          setOpenDialog(true);
        }}
      >
        Create New Album
      </Button>
      <Grid container spacing={4}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <AlbumCard
              album={album}
              onEdit={(album) => {
                setCurrentAlbum(album);
                setOpenDialog(true);
              }}
              onDelete={deleteAlbum}
              onClick={(album) => {
                setCurrentAlbum(album);
                setOpenAlbumView(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      {/* Dialog for Creating or Editing Albums */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentAlbum ? "Edit Album" : "Create Album"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Album Name"
            fullWidth
            value={currentAlbum ? currentAlbum.name : newAlbumName}
            onChange={(e) =>
              currentAlbum
                ? setCurrentAlbum({ ...currentAlbum, name: e.target.value })
                : setNewAlbumName(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (currentAlbum) {
                updateAlbum(currentAlbum);
              } else {
                handleCreateAlbum();
              }
              setOpenDialog(false);
            }}
          >
            {currentAlbum ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Viewing Album Images */}
      <Dialog
        open={openAlbumView}
        onClose={() => {
          setOpenAlbumView(false);
          setSelectedPhotos(new Set());
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{currentAlbum?.name}</Typography>
            <Box>
              {selectedPhotos.size > 0 && (
                <Button
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => {
                    if (currentAlbum) {
                      deletePhotosFromAlbum(currentAlbum.id, selectedPhotos);
                      setSelectedPhotos(new Set());
                    }
                  }}
                  sx={{ mr: 1 }}
                >
                  Delete Selected ({selectedPhotos.size})
                </Button>
              )}
              <IconButton
                onClick={() => {
                  if (currentAlbum) {
                    deleteAllPhotosFromAlbum(currentAlbum.id);
                  }
                }}
                disabled={!currentAlbum?.photos.length}
              >
                <Delete />
              </IconButton>
              <Checkbox
                checked={
                  selectedPhotos.size === currentAlbum?.photos.length &&
                  currentAlbum?.photos.length > 0
                }
                onChange={handleSelectAllImages}
                disabled={!currentAlbum?.photos.length}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {currentAlbum?.photos.length ? (
            <PhotoGrid
              photos={currentAlbum.photos}
              selectedPhotos={selectedPhotos}
              onPhotoSelect={handlePhotoSelect}
              onReorder={(newPhotos) =>
                handleReorderPhotos(currentAlbum.id, newPhotos)
              }
            />
          ) : (
            <Typography variant="body1" textAlign="center" sx={{ p: 2 }}>
              There are no images in this album yet
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlbumView(false);
              setSelectedPhotos(new Set());
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default Albums;
