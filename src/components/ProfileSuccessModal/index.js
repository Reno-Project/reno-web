import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Images from "../../config/images";
import useStyles from "./styles";

function ProfileSuccessModal(props) {
  const {
    visible = false,
    title = "Thank you!",
    msg = "We will review your profile and let you know once your profile is approved",
    btnTitle = "Start Exploring",
    navigatePath = "",
  } = props;
  const { userData } = useSelector((state) => state.auth);
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDisable, setIsDisable] = useState(false);
  const [isOpen, setIsOpen] = useState(visible);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? 300 : 500,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    padding: "60px 60px 48px 60px",
  };

  useEffect(() => {
    if (userData && !isEmpty(userData?.contractor_data) && visible) {
      const { profile_completed, is_profile_verified } =
        userData?.contractor_data;
      if (profile_completed === "completed" && !is_profile_verified) {
        setIsDisable(true);
      }
    }
  }, [visible]);

  return (
    <div>
      <Modal
        open={isOpen}
        closeAfterTransition
        disableAutoFocus
        slotProps={{ backdrop: Backdrop }}
        style={{ overflowY: "scroll" }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <div className={classes.container}>
              <img src={Images.success} alt="success_img" />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <Typography className={classes.title}>{title}</Typography>
                <Typography className={classes.descTextStyle}>{msg}</Typography>
              </div>
              <Button
                variant="contained"
                fullWidth
                disabled={isDisable}
                onClick={() => {
                  navigatePath
                    ? navigate(navigatePath)
                    : navigate("/dashboard");
                  setIsOpen(!isOpen);
                }}
              >
                {btnTitle}
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileSuccessModal;
