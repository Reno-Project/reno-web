import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Modal,
  Fade,
  Box,
  useMediaQuery,
  Backdrop,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getApiData } from "../../utils/APIHelper";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import OtpInputFields from "react-otp-input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { color } from "../../config/theme";
import { useTheme } from "@emotion/react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const PhoneVerificationModal = (props) => {
  const { visible = false, handleClose = () => null } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.data ? location?.state?.data : {};
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const [output, setOutput] = useState("");
  console.log("output====>>>>>", output);
  const [timerCount, setTimer] = useState(60);
  const [btnLoad, setBtnLoad] = useState("");
  const [resendViewVisible, setResendViewVisible] = useState(false);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const phoneNumber = `555-123-4567`;
  const lastFour = phoneNumber.slice(-5);
  const hiddenDigits = "*".repeat(phoneNumber.length - 5);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: sm ? 300 : 500,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    padding: 50,
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  useEffect(() => {
    setOutput("");
  }, []);

  useEffect(() => {
    if (timerCount === 0) {
      setResendViewVisible(true);
    }
    if (!timerCount) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(timerCount - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerCount]);

  async function OTPVerify(code) {
    // setBtnLoad("otp");
    // try {
    //   const response = await getApiData(Setting.endpoints.verifyOtp, "POST", {
    //     otp: code,
    //   });
    //   console.log("response ====sasdasds=>>> ", response);
    //   if (response.success) {
    //     toast.success(response?.message);
    //     dispatch(setUserData(response?.data));
    //     dispatch(setToken(response?.token));
    //     // move to create profile screen
    //     navigate("/create-profile");
    //   } else {
    //     toast.error(response?.message);
    //   }
    //   setBtnLoad("");
    // } catch (error) {
    //   console.log("🚀 ~ file: index.js:50 ~ OTPVerify ~ error:", error);
    //   toast.error(error.toString() || "Something gone wrong! Please try again");
    //   setBtnLoad("");
    // }
  }

  // this function resend otp to the user
  async function resendOtp() {
    setTimer(60);
    setResendViewVisible(false);
    setOutput("");
    setBtnLoad("");
    // setBtnLoad("resend");
    // try {
    //   const response = await getApiData(Setting.endpoints.resendOtp, "POST", {
    //     email: locationState?.email,
    //   });

    //   console.log("response ====resend otp=>>> ", response);
    //   if (response.success) {
    //     toast.success(response.message);
    //     setTimer(60);
    //     setResendViewVisible(false);
    //     setOutput("");
    //   } else {
    //     toast.error(response.message);
    //   }
    //   setBtnLoad("");
    // } catch (error) {
    //   console.log("🚀 ~ file: index.js:88 ~ resendOtp ~ error:", error);
    //   toast.error(error.toString() || "Something gone wrong! Please try again");
    //   setBtnLoad("");
    // }
  }

  return (
    <Modal
      open={visible}
      // onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slotProps={{ backdrop: Backdrop }}
      style={{ overflowY: "scroll" }}
    >
      <Fade in={visible}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <div>
            <Typography className={classes.loginHeaderText}>
              Phone Verification
            </Typography>
            <Typography className={classes.welcomeTextStyle}>
              Protecting your account is our top priority. please confirm your
              account by entering the authorization code sent to
            </Typography>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <Typography variant="h5">
              {hiddenDigits}
              {lastFour}
            </Typography>
          </div>
          <Grid item xs={12} sm={7} md={5} lg={4} justifyContent={"center"}>
            <OtpInputFields
              fullWidth
              value={output}
              onChange={setOutput}
              numInputs={4}
              renderSeparator={<span style={{ padding: 10 }}> </span>}
              renderInput={(props) => (
                <input {...props} className={classes.myOtpInput} />
              )}
              inputType="number"
              inputStyle={{
                height: 40,
                width: 40,
                fontSize: 20,
                border: `1px solid ${color.primary}`,
                borderRadius: 6,
              }}
            />
          </Grid>
          <Grid item container my={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (btnLoad === "resend" || btnLoad === "otp") {
                  return null;
                } else {
                  if (output.length === 4) {
                    OTPVerify(output);
                  } else {
                    toast.error("Please enter one time password", {
                      toastId: 11,
                    });
                  }
                }
              }}
            >
              {btnLoad === "otp" ? (
                <CircularProgress style={{ color: "#fff" }} size={26} />
              ) : (
                "Verify Now"
              )}
            </Button>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography
                textAlign={"center"}
                className={classes.welcomeTextStyle}
                color="#646F86"
              >
                It may take a minute to receive your code.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.welcomeTextStyle}
                textAlign={"center"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  color: "#646F86",
                }}
              >
                {!resendViewVisible
                  ? ` Resend OTP in : 00: ${timerCount}`
                  : `Haven't received it?`}
                {resendViewVisible && (
                  <Typography
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: color.primary,
                      marginLeft: 8,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      if (
                        btnLoad === "resend" ||
                        !resendViewVisible ||
                        btnLoad === "otp"
                      ) {
                        return null;
                      } else {
                        resendOtp();
                      }
                    }}
                  >
                    Resend a new code.
                  </Typography>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PhoneVerificationModal;
