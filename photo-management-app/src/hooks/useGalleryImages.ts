import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Photo } from "./useGallery";
const accessKey = "yV2m_rhcRv8dfOGOA7uguPjkusei1k4kpqbZXVxpPNc";

export const useGalleryImages = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const fetchPhotos = async () => {
    setIsLoading(true);
    setError(null);
    const searchCategory = searchParams.get("Search") || "animal";
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchCategory}&page=1&per_page=30&client_id=${accessKey}`
      );
      const data = await res.json();
      setPhotos(data.results);
      setFilteredPhotos(data.results);
    } catch (error) {
      setError("Error fetching photos. Please try again later.");
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [searchParams.get("Search")]);

  return { photos, filteredPhotos, setFilteredPhotos, isLoading, error };
};
