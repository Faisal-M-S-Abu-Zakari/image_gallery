import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Avatar } from "@mui/joy";
import Button from "@mui/joy/Button";

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
              <Avatar
                src={selectedPhoto?.user.profile_image.medium}
                alt={selectedPhoto?.user.name}
                sx={{ width: 60, height: 60 }}
              />
              <Typography level="body-lg" fontWeight="bold">
                <a
                  href={selectedPhoto?.user.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedPhoto?.user.name}
                </a>
              </Typography>
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
              onClick={() => window.open(selectedPhoto?.links.html, "_blank")}
              sx={{ mt: 2 }}
            >
              ADD TO ALBUM
            </Button>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
};

export default ImageModal;
