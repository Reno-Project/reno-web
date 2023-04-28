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
          padding: isMobile ? 20 : 30,
        }}
      >
        <Grid item>
          <Typography
            style={{
              fontFamily: "ElMessiri-SemiBold",
              fontSize: isMobile ? "22px" : "28px",
              textAlign: "center",
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
          <Grid item xs={isMobile ? 6 : 5}>
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={isMobile ? 6 : 5}>
            <Button fullWidth variant="contained" onClick={confirmation}>
              {loader ? (
                <CircularProgress style={{ color: "#fff" }} size={26} />
              ) : (
                "Sign out"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}
