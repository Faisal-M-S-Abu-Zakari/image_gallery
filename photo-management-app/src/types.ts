export interface Photo {
  id: number;
  url: string;
  displayUrl: string;
}
export interface Album {
  id: number;
  name: string;
  photos: Photo[];
  cover: Photo | null;
}
export interface SelectedPhoto {
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  created_at: string;
  updated_at: string;
  alt_description?: string;
  displayUrl?: string;
}
export interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  selectedPhoto: any;
}
export type UploadedImage = {
  url: string;
  title: string;
  description: string;
  user: string;
};
export interface GalleryFiltersProps {
  handleType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSortBy: (value: "created" | "updated") => void;
  toggleSortOrder: () => void;
  setViewMode: (mode: "grid" | "list") => void;
  typeValue: string;
  sortBy: "created" | "updated";
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
}
export interface AlbumCardProps {
  album: Album;
  onEdit: (album: Album) => void;
  onDelete: (albumId: number) => void;
  onClick: (album: Album) => void;
}
