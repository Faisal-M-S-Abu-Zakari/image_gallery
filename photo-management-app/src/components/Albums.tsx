import React, { useState } from "react";
import {
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
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type Photo = {
  id: number;
  url: string;
};

type Album = {
  id: number;
  name: string;
  photos: Photo[];
  cover: number | null;
};

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAlbumDialog, setOpenAlbumDialog] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [newAlbumName, setNewAlbumName] = useState<string>("");
  const [selectedCover, setSelectedCover] = useState<number | null>(null);

  // Open "Create Album" dialog
  const handleOpenCreateAlbum = () => {
    setCurrentAlbum(null);
    setNewAlbumName("");
    setSelectedCover(null);
    setOpenDialog(true);
  };

  // Create a new album
  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      const newAlbum: Album = {
        id: Date.now(),
        name: newAlbumName,
        photos: [],
        cover: null,
      };
      setAlbums([...albums, newAlbum]);
      setOpenDialog(false);
    }
  };

  // Open "Edit Album" dialog
  const handleOpenEditAlbum = (album: Album) => {
    setCurrentAlbum(album);
    setNewAlbumName(album.name);
    setSelectedCover(album.cover);
    setOpenDialog(true);
  };

  // Save album changes
  const handleSaveAlbum = () => {
    if (currentAlbum) {
      setAlbums(
        albums.map((album) =>
          album.id === currentAlbum.id
            ? { ...album, name: newAlbumName, cover: selectedCover }
            : album
        )
      );
    }
    setOpenDialog(false);
  };

  // Delete an album
  const handleDeleteAlbum = (albumId: number) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
  };

  // Open album to view images
  const handleOpenAlbum = (album: Album) => {
    setCurrentAlbum(album);
    setOpenAlbumDialog(true);
  };

  return (
    <div>
      {/* Centered "Create New Album" Button */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#003366",
            "&:hover": { backgroundColor: "#001f33" },
            padding: "10px 20px",
            fontSize: "18px",
          }}
          onClick={handleOpenCreateAlbum}
        >
          Create New Album
        </Button>
      </Box>

      <Container sx={{ mt: 4 }}>
        {/* Albums Grid */}
        <Grid container spacing={4}>
          {albums.map((album) => (
            <Grid item key={album.id} xs={12} sm={6} md={4}>
              <Card>
                {/* Clicking this opens the album */}
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    album.cover
                      ? album.photos.find((photo) => photo.id === album.cover)
                          ?.url
                      : "https://via.placeholder.com/150"
                  }
                  alt={album.name}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenAlbum(album)}
                />
                <CardContent>
                  <Typography variant="h5">{album.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {album.photos.length} photos
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleOpenEditAlbum(album)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAlbum(album.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Create/Edit Album Dialog */}
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
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
          />

          {/* Cover Photo Selection (Only for Editing) */}
          {currentAlbum && currentAlbum.photos.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Select Album Cover:</Typography>
              <Select
                fullWidth
                value={selectedCover || ""}
                onChange={(e) => setSelectedCover(e.target.value as number)}
              >
                {currentAlbum.photos.map((photo) => (
                  <MenuItem key={photo.id} value={photo.id}>
                    <img
                      src={photo.url}
                      alt="Cover"
                      width="50"
                      height="50"
                      style={{ marginRight: "10px" }}
                    />
                    {photo.id}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={currentAlbum ? handleSaveAlbum : handleCreateAlbum}>
            {currentAlbum ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Album Photos Dialog */}
      <Dialog
        open={openAlbumDialog}
        onClose={() => setOpenAlbumDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{currentAlbum?.name}</DialogTitle>
        <DialogContent dividers sx={{ minHeight: "300px" }}>
          {currentAlbum?.photos.length ? (
            <Grid container spacing={2}>
              {currentAlbum.photos.map((photo) => (
                <Grid item key={photo.id} xs={6} sm={4} md={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={photo.url}
                      alt="Album Photo"
                      sx={{ width: "100%", height: "auto" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
              There are no images in this album yet.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlbumDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlbumsPage;
