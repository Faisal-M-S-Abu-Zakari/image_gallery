import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGalleryImages } from "./useGalleryImages";
import { SelectedPhoto } from "../types";

export function useGallery() {
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"created" | "updated">("created");

  const { photos, filteredPhotos, setFilteredPhotos, isLoading } =
    useGalleryImages();

  useEffect(() => {
    filterPhotos();
  }, [photos, sortOrder, sortBy, searchParams]);

  const filterPhotos = () => {
    const type = searchParams.get("Type");
    const size = searchParams.get("Size");

    let filtered = [...photos];

    // Filter by type
    if (type === "jpeg") {
      filtered = filtered.filter((photo) => photo.urls.full.includes("jpg"));
    } else if (type === "png") {
      filtered = filtered.filter((photo) => photo.urls.full.includes("png"));
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(
        sortBy === "created" ? a.created_at : a.updated_at
      );
      const dateB = new Date(
        sortBy === "created" ? b.created_at : b.updated_at
      );
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    // Set display URL based on size
    filtered = filtered.map((photo) => ({
      ...photo,
      displayUrl:
        size === "small"
          ? photo.urls.small
          : size === "regular"
          ? photo.urls.regular
          : size === "full"
          ? photo.urls.full
          : photo.urls.small,
    }));

    setFilteredPhotos(filtered);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = e.target.value;
    if (query === "all") {
      searchParams.delete("Type");
    } else {
      searchParams.set("Type", query);
    }
    setSearchParams(searchParams);
  };

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size === "all") {
      searchParams.delete("Size");
    } else {
      searchParams.set("Size", size);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query === "") {
      searchParams.delete("Search");
    } else {
      searchParams.set("Search", query);
    }
    setSearchParams(searchParams);
  };

  const handleImageClick = (photo: SelectedPhoto) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return {
    // State
    open,
    selectedPhoto,
    viewMode,
    sortOrder,
    sortBy,
    filteredPhotos,
    isLoading,
    searchParams,

    // Actions
    setOpen,
    setSelectedPhoto,
    setViewMode,
    setSortOrder,
    setSortBy,
    handleType,
    handleSize,
    handleSearch,
    handleImageClick,
    toggleSortOrder,
  };
}
