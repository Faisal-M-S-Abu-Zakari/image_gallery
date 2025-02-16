import { useState, useEffect } from "react";
import { type Album } from "../types";
export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);
  const createAlbum = (name: string) => {
    const newAlbum: Album = {
      id: Date.now(),
      name: name,
      photos: [],
      cover: null,
    };
    setAlbums([...albums, newAlbum]);
    return newAlbum;
  };
  const deleteAlbum = (albumId: number) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
  };
  const updateAlbum = (updatedAlbum: Album) => {
    setAlbums(
      albums.map((album) =>
        album.id === updatedAlbum.id ? updatedAlbum : album
      )
    );
  };
  const deletePhotosFromAlbum = (albumId: number, photoIds: Set<number>) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => {
        if (album.id === albumId) {
          const updatedPhotos = album.photos.filter(
            (photo) => !photoIds.has(photo.id)
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
  };
  const deleteAllPhotosFromAlbum = (albumId: number) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.id === albumId ? { ...album, photos: [], cover: null } : album
      )
    );
  };
  return {
    albums,
    createAlbum,
    deleteAlbum,
    updateAlbum,
    deletePhotosFromAlbum,
    deleteAllPhotosFromAlbum,
  };
};
