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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

// Define TypeScript types
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
//change
const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [openAlbumView, setOpenAlbumView] = useState(false);
  const Draggable1: any = Draggable;
  const Droppable1: any = Droppable;
  const DragDropContext1: any = DragDropContext;

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
      setOpenDialog(false);
    }
  };

  const handleDeleteAlbum = (albumId: number) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
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
                if (album.photos.length > 0) {
                  console.log(album.photos[0].displayUrl);
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  album.cover && album.cover.displayUrl
                    ? album.cover.displayUrl
                    : "https://via.placeholder.com/150"
                }
                alt={album.name}
              />
              <CardContent>
                <Typography variant="h5">{album.name}</Typography>
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
                    handleDeleteAlbum(album.id);
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
      <Dialog open={openAlbumView} onClose={() => setOpenAlbumView(false)}>
        <DialogTitle>{currentAlbum?.name}</DialogTitle>
        <DialogContent dividers>
          {currentAlbum?.photos.length ? (
            <Grid container spacing={2}>
              {currentAlbum.photos.map((photo) => (
                <Grid item key={photo.id} xs={6} sm={4} md={3}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={
                      photo.displayUrl ||
                      photo.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Album Photo"
                    sx={{ objectFit: "cover", width: "100%" }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            // <DragDropContext
            //   onDragEnd={(result: DropResult) => {
            //     // Handle reordering of photos
            //     const { source, destination } = result;
            //     if (!destination) return;

            //     const reorderedPhotos = Array.from(currentAlbum.photos);
            //     const [movedPhoto] = reorderedPhotos.splice(source.index, 1);
            //     reorderedPhotos.splice(destination.index, 0, movedPhoto);

            //     // Update the album with reordered photos
            //     setAlbums((prevAlbums) =>
            //       prevAlbums.map((album) =>
            //         album.id === currentAlbum.id
            //           ? { ...album, photos: reorderedPhotos }
            //           : album
            //       )
            //     );
            //   }}
            // >
            //   <Droppable1 droppableId="photoList" direction="horizontal">
            //     {(provided: DroppableProvided, snapshot) => (
            //       <Grid
            //         container
            //         spacing={2}
            //         {...provided.droppableProps}
            //         ref={provided.innerRef}
            //       >
            //         {currentAlbum.photos.map((photo, index) => (
            //           <Draggable1
            //             key={photo.id}
            //             draggableId={photo.id.toString()}
            //             index={index}
            //           >
            //             {(provided: DraggableProvided) => (
            //               <Grid
            //                 item
            //                 key={photo.id}
            //                 xs={6}
            //                 sm={4}
            //                 md={3}
            //                 ref={provided.innerRef}
            //                 {...provided.draggableProps}
            //                 {...provided.dragHandleProps}
            //               >
            //                 <CardMedia
            //                   component="img"
            //                   height="100"
            //                   image={
            //                     photo.displayUrl ||
            //                     photo.url ||
            //                     "https://via.placeholder.com/150"
            //                   } // Fallback to placeholder if no URL or displayUrl
            //                   alt="Album Photo"
            //                   sx={{ objectFit: "cover", width: "100%" }}
            //                 />
            //               </Grid>
            //             )}
            //           </Draggable1>
            //         ))}
            //         {provided.placeholder}
            //       </Grid>
            //     )}
            //   </Droppable1>
            // </DragDropContext>
            <Typography variant="body1" textAlign="center" sx={{ p: 2 }}>
              There are no images in this album yet
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlbumView(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Albums;
