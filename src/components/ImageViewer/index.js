import { Box, Fade, Modal, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export default function ImageViewer({ url, visible, onClose, isPdf = false }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: sm ? "50%" : "80%",
    height: sm ? "50%" : "80%",
    bgcolor: "transparent",
    borderRadius: 1,
    // boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div onClick={onClose}>
      <Modal
        centered
        title="Document Preview"
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <Fade in={visible}>
          <Box sx={style}>
            {isPdf ? (
              <div>
                <p>Something went wrong</p>
              </div>
            ) : (
              <img
                onClick={onchange}
                src={url}
                alt="Document"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
