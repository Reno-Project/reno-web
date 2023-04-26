import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getApiData } from "../../utils/APIHelper";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import OtpInputFields from "react-otp-input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { color } from "../../config/theme";

const OtpInput = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.data ? location?.state?.data : {};
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const [output, setOutput] = useState("");
  const [timerCount, setTimer] = useState(60);
  const [btnLoad, setBtnLoad] = useState("");
  const [resendViewVisible, setResendViewVisible] = useState(false);

  useEffect(() => {
    setOutput("");
  }, []);

  useEffect(() => {
    if (output?.length === 5) {
      OTPVerify(output);
    }
  }, [output]);

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
        toast.success(response?.message);
        dispatch(setUserData(response?.data));
        dispatch(setToken(response?.token));
        // move to create profile screen
        if (response?.data?.contractor_data?.profile_completed === "pending") {
          navigate("/create-profile");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response?.message);
        setOutput("");
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
        toast.success(response.message);
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
        style={{ paddingTop: 50 }}
      >
        <Grid item xs={9} sm={7} md={5} lg={4}>
          <Typography className={classes.welcomeTextStyle}>
            Welcome to Reno
          </Typography>
          <Typography className={classes.loginHeaderText}>
            Verify your Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} md={5} lg={4} justifyContent={"center"}>
          <OtpInputFields
            fullWidth
            value={output}
            onChange={setOutput}
            numInputs={5}
            renderSeparator={<span style={{ padding: 10 }}> </span>}
            renderInput={(props) => <input {...props} />}
            inputType="tel"
            inputStyle={{
              height: 40,
              width: 40,
              fontSize: 20,
              border: `1px solid ${color.primary}`,
              borderRadius: 6,
            }}
          />
        </Grid>

        <Grid
          item
          container
          xs={7}
          sm={7}
          md={5}
          lg={4}
          gap={2}
          marginTop={5}
          justifyContent="center"
        >
          <Grid item xs={5}>
            <Button
              fullWidth
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
                <CircularProgress style={{ color: color.primary }} size={26} />
              ) : resendViewVisible ? (
                "Resend Otp"
              ) : (
                `00:${timerCount}`
              )}
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                if (btnLoad === "resend" || btnLoad === "otp") {
                  return null;
                } else {
                  if (output) {
                    OTPVerify(output);
                  } else {
                    toast.error("Please enter one time password");
                  }
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
        </Grid>
      </Grid>
    </div>
  );
};

export default OtpInput;
