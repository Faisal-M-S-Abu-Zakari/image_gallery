import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Box } from "@mui/joy";
import Swal from "sweetalert2";
interface Photo {
  id: number;
  url: string;
  displayUrl: string;
}
interface Album {
  id: number;
  name: string;
  photos: Photo[];
  cover: Photo | null;
}
const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [openAlbumView, setOpenAlbumView] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);
  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      const newAlbum: Album = {
        id: Date.now(),
        name: newAlbumName,
        photos: [],
        cover: null,
      };
      setAlbums([...albums, newAlbum]);
      setNewAlbumName("");
      Swal.fire({
        title: "Album Added Successfully!",
        text: "You clicked the button!",
        icon: "success",
      });
      setOpenDialog(false);
    }
  };
  const handleDeleteAlbum = (albumId: number) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
  };
  const handleSelectAllImages = () => {
    if (selectedPhotos.size === currentAlbum?.photos.length) {
      setSelectedPhotos(new Set());
    } else {
      const allPhotoIds = new Set(
        currentAlbum?.photos.map((photo) => photo.id)
      );
      setSelectedPhotos(allPhotoIds);
    }
  };
  const handleDeleteSelectedImages = () => {
    if (!currentAlbum || selectedPhotos.size === 0) return;

    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => {
        if (album.id === currentAlbum.id) {
          const updatedPhotos = album.photos.filter(
            (photo) => !selectedPhotos.has(photo.id)
          );
          const updatedCover =
            updatedPhotos.length > 0 ? updatedPhotos[0] : null;
          return {
            ...album,
            photos: updatedPhotos,
            cover: updatedCover,
          };
        }
        return album;
      })
    );

    setSelectedPhotos(new Set());
  };
  const handleDeleteAllImages = (albumId: number | null) => {
    if (!albumId) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete all photos from this album?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) =>
            album.id === albumId ? { ...album, photos: [], cover: null } : album
          )
        );
        setSelectedPhotos(new Set());
        Swal.fire(
          "Deleted!",
          "All photos have been deleted from the album.",
          "success"
        );
      }
    });
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
            <Card
              onClick={() => {
                setCurrentAlbum(album);
                setOpenAlbumView(true);
              }}
            >
              <CardMedia
                component="img"
                sx={{ objectFit: "cover", height: "300px" }}
                image={
                  album.photos.length > 0
                    ? album.photos[0].displayUrl || album.photos[0].url
                    : "https://via.placeholder.com/150"
                }
                alt={album.name}
              />
              <CardContent>
                <Typography variant="h5">{album.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {album.photos.length} photos
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentAlbum(album);
                    setOpenDialog(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDeleteAlbum(album.id);
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your album has been deleted.",
                          icon: "success",
                        });
                      }
                    });
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
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
                setAlbums(
                  albums.map((album) =>
                    album.id === currentAlbum.id ? currentAlbum : album
                  )
                );
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
                  onClick={handleDeleteSelectedImages}
                  sx={{ mr: 1 }}
                >
                  Delete Selected ({selectedPhotos.size})
                </Button>
              )}
              <IconButton
                onClick={() => handleDeleteAllImages(currentAlbum?.id || null)}
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
            <Grid container spacing={2}>
              {currentAlbum.photos.map((photo) => (
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
                      onClick={() => {
                        const newSelection = new Set(selectedPhotos);
                        if (newSelection.has(photo.id)) {
                          newSelection.delete(photo.id);
                        } else {
                          newSelection.add(photo.id);
                        }
                        setSelectedPhotos(newSelection);
                      }}
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
                        onChange={() => {
                          const newSelection = new Set(selectedPhotos);
                          if (newSelection.has(photo.id)) {
                            newSelection.delete(photo.id);
                          } else {
                            newSelection.add(photo.id);
                          }
                          setSelectedPhotos(newSelection);
                        }}
                        sx={{
                          color: "white",
                          "&.Mui-checked": { color: "white" },
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
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
