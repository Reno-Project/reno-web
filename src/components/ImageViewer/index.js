import { Modal } from "@mui/material";
import React from "react";

export default function ImageViewer({ url, visible, onClose, isPdf = false }) {
  return (
    <div onClick={onClose}>
      <Modal
        centered
        title="Document Preview"
        open={visible}
        onCancel={onClose}
        style={{
          textAlign: "center",
          top: "10%",
        }}
        footer={null}
      >
        {isPdf ? (
          <div>
            <p>Something went wrong</p>
          </div>
        ) : (
          <img
            onClick={onchange}
            src={url}
            alt="Document"
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 200px)",
            }}
          />
        )}
      </Modal>
    </div>
  );
}
