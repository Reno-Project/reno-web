import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Images from "../../config/images";
import useStyles from "./styles";

function ProfileSuccessModal(props) {
  const { visible = false } = props;
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 330,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: 50,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={visible}
        closeAfterTransition
        disableAutoFocus
        slotProps={{ backdrop: Backdrop }}
        style={{ overflowY: "scroll" }}
      >
        <Fade in={visible}>
          <Box sx={style}>
            <div className={classes.container}>
              <img src={Images.success} alt="success_img" />
              <Typography className={classes.titleTextStyle}>
                Congrats!
              </Typography>
              <Typography className={classes.descTextStyle}>
                Your profile has been created successfully.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/dashboard")}
              >
                Start Exploring
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileSuccessModal;
