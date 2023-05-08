import {
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { isMobile } from "react-device-detect";

export default function ConfirmModel(props) {
  const {
    message = "",
    visible = false,
    handleClose = () => null,
    confirmation = () => null,
    loader = false,
    title = "",
  } = props;

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      disableAutoFocus
      open={visible}
    >
      <Grid
        item
        xs={10}
        sm={8}
        md={6}
        lg={4}
        justifyContent={"center"}
        style={{
          backgroundColor: "#FFF",
          borderRadius: 4,
          padding: isMobile ? 30 : 40,
        }}
      >
        <Grid item>
          <Typography
            style={{
              color: "#0D1522 ",
              fontFamily: "Roobert-Regular",
              fontSize: "18px",
              letterSpacing: "0.5px",
              lineHeight: "24px",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "24px",
              padding: isMobile ? 0 : "0 30px",
            }}
          >
            {message}
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent={"center"}
          gap={isMobile ? 1 : 2}
          wrap="nowrap"
          marginTop={"10px"}
        >
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={confirmation}>
              {loader ? (
                <CircularProgress style={{ color: "#fff" }} size={26} />
              ) : title ? (
                title
              ) : (
                "Confirm"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}
