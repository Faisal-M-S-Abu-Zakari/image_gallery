import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Avatar, DialogTitle, List, ListItem, ListItemButton } from "@mui/joy";
import Button from "@mui/joy/Button";
import { Dialog, DialogContent } from "@mui/material";
import Swal from 'sweetalert2'

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  selectedPhoto: any;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  selectedPhoto,
}) => {
  const [openSaveDialog, SetOpenSaveDialog] = useState<boolean>(false);
  const [albums, setAlbums] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const savedAlbums = localStorage.getItem("albums");
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }
  }, []);

  const handleOpenSaveDialog = () => {
    SetOpenSaveDialog(true);
  };

  const handleSaveToAlbum = (albumId: number) => {
    const savedAlbums = localStorage.getItem("albums");
    if (!savedAlbums) return;

    const albums = JSON.parse(savedAlbums);
    const updatedAlbums = albums.map((album: any) =>
      album.id === albumId
        ? { ...album, photos: [...album.photos, selectedPhoto] }
        : album
    );

    const updatedAlbum = updatedAlbums.find(
      (album: any) => album.id === albumId
    );
    if (updatedAlbum && updatedAlbum.photos.length > 0) {
      updatedAlbum.cover = updatedAlbum.photos[updatedAlbum.photos.length - 1];
    }
    console.log(selectedPhoto.displayUrl);
    localStorage.setItem("albums", JSON.stringify(updatedAlbums));
    // Toast.success('image saved successfully!')
    onClose();
    Swal.fire({
      title: "Image Added Successfully!",
      text: "You clicked the button!",
      icon: "success"
    });
    SetOpenSaveDialog(false);
  };

  //change
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(5px)", // Blurred background
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 1200,
          p: 4,
          boxShadow: "xl",
          backgroundColor: "white",
          width: "90%",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1, color: "gray" }} />

        {/* Title */}
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: "black",
          }}
        >
          Image Details
        </Typography>

        {/* Image and Details Layout */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Image Section */}
          <div className="w-full sm:w-1/2 flex justify-center">
            <img
              src={selectedPhoto?.displayUrl}
              alt={selectedPhoto?.alt_description || "Gallery Image"}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Details Section */}
          <div className="w-full sm:w-1/2 flex flex-col !space-y-8 !mx-4">
            <div className="flex items-center gap-3">
            {
              selectedPhoto?.user&&
              <Avatar
                src={selectedPhoto?.user.profile_image.medium}
                alt={selectedPhoto?.user.name}
                sx={{ width: 60, height: 60 }}
              />
            }  
            {
               selectedPhoto?.user&&  <Typography level="body-lg" fontWeight="bold">
               <a
                 href={selectedPhoto?.user.links.html}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:underline"
               >
                 {selectedPhoto?.user.name}
               </a>
             </Typography>
            }
             
            </div>
            <Typography level="body-lg" fontWeight="bold">
              {selectedPhoto?.alt_description || "No Title"}
            </Typography>

            <Typography level="body-md" textColor="text.secondary">
              {selectedPhoto?.description || "No Description Available"}
            </Typography>

            <Button
              variant="solid"
              color="primary"
              onClick={handleOpenSaveDialog}
              sx={{ mt: 2 }}
            >
              ADD TO ALBUM
            </Button>
          </div>
          <Dialog 
  open={openSaveDialog} 
  onClose={() => SetOpenSaveDialog(false)}
  sx={{
    "& .MuiDialog-paper": {
      borderRadius: "12px", 
      padding: "20px", 
      maxWidth: "400px", 
      backgroundColor: "#f9f9f9",
    },
  }}
>
  <DialogTitle 
    sx={{ 
      fontWeight: "bold", 
      textAlign: "center", 
      fontSize: "1.2rem",
      color: "#333"
    }}
  >
    Pick an Album
  </DialogTitle>
  <DialogContent>
    <List>
      {albums.length > 0 ? (
        albums.map((album) => (
          <ListItem 
            key={album.id} 
            sx={{ borderBottom: "1px solid #ddd" }}
          >
            <ListItemButton
              onClick={() => handleSaveToAlbum(album.id)}
              sx={{
                borderRadius: "8px",
                transition: "background 0.3s ease",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              }}
            >
              {album.name}
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <Typography 
          sx={{ 
            p: 2, 
            textAlign: "center", 
            fontSize: "0.9rem", 
            color: "gray"
          }}
        >
          No albums found. Create one first.
        </Typography>
      )}
    </List>
  </DialogContent>
</Dialog>

        </div>
      </Sheet>
    </Modal>
  );
};

export default ImageModal;
