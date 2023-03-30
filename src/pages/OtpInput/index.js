import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { getApiData } from "../../utils/APIHelper";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import Images from "../../config/images";
import OtpInputFields from "react-otp-input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

const OtpInput = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.data ? location?.state?.data : {};
  console.log("locationState =====>>> ", locationState);
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const [output, setOutput] = useState("");
  const [timerCount, setTimer] = useState(60);
  const [btnLoad, setBtnLoad] = useState("");
  const [resendViewVisible, setResendViewVisible] = useState(false);

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
    setBtnLoad("otp");
    try {
      const response = await getApiData(Setting.endpoints.verifyOtp, "POST", {
        otp: code,
      });

      console.log("response ====sasdasds=>>> ", response);
      if (response.success) {
        dispatch(setUserData(response?.data));
        dispatch(setToken(response?.token));
        // move to create profile screen
        navigate("/create-profile");
      } else {
        toast.error(response?.message);
      }
      setBtnLoad("");
    } catch (error) {
      console.log("🚀 ~ file: index.js:50 ~ OTPVerify ~ error:", error);
      toast.error(error.toString() || "Something gone wrong! Please try again");
      setBtnLoad("");
    }
  }

  // this function resend otp to the user
  async function resendOtp() {
    setBtnLoad("resend");
    try {
      const response = await getApiData(Setting.endpoints.resendOtp, "POST", {
        email: locationState?.email,
      });

      console.log("response ====resend otp=>>> ", response);
      if (response.success) {
        setTimer(60);
        setResendViewVisible(false);
        setOutput("");
      } else {
        toast.error(response.message);
      }
      setBtnLoad("");
    } catch (error) {
      console.log("🚀 ~ file: index.js:88 ~ resendOtp ~ error:", error);
      toast.error(error.toString() || "Something gone wrong! Please try again");
      setBtnLoad("");
    }
  }

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ paddingTop: 40 }}
      >
        <Grid item xs={12}>
          <Typography className={classes.welcomeTextStyle}>
            Welcome to Reno
          </Typography>
          <Typography className={classes.loginHeaderText}>
            Verify your Email
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <OtpInputFields
                value={output}
                onChange={setOutput}
                numInputs={5}
                renderSeparator={<span style={{ padding: 5 }}> </span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{ height: 30, width: 30 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20 }}
                onClick={() => {
                  if (btnLoad === "resend" || btnLoad === "otp") {
                    return null;
                  } else {
                    OTPVerify(output);
                  }
                }}
              >
                {btnLoad === "otp" ? (
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : (
                  "Verify"
                )}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
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
                {btnLoad === "resend" ? (
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : resendViewVisible ? (
                  "Resend Otp"
                ) : (
                  `00:${timerCount}`
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default OtpInput;
