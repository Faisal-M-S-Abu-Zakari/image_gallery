import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { AlbumCardProps } from "../types";
import Swal from "sweetalert2";

export const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  onEdit,
  onDelete,
  onClick,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
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
        onDelete(album.id);
        Swal.fire({
          title: "Deleted!",
          text: "Your album has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <Card onClick={() => onClick(album)}>
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
            onEdit(album);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};
