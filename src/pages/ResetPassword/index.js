import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import CInput from "../../components/CInput";
import { toast } from "react-toastify";
import useStyles from "./styles";
import { getApiData, getAPIProgressData } from "../../utils/APIHelper";
import OtpInputFields from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../config/theme.js";

const errorObj = {
  passwordErr: false,
  passwordMsg: "",
  newPasswordErr: false,
  newPasswordMsg: "",
};

const ResetPassword = (props) => {
  const classes = useStyles();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errObj, setErrObj] = useState(errorObj);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.data ? location?.state?.data : {};
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const [output, setOutput] = useState("");
  const [timerCount, setTimer] = useState(60);
  const [btnLoad, setBtnLoad] = useState("");
  const [resendViewVisible, setResendViewVisible] = useState(false);

  const passwordRegex =
    /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z]))(?=.*[!@#$%^&*])((?=.*[A-Z])))(?=.{8,})/;

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

  // this function checks validation of login field
  function validation() {
    const error = { ...errObj };
    let valid = true;

    //validate otp
    if (isEmpty(otp)) {
      valid = false;
      error.otpErr = true;
      error.otpMsg = "Please enter OTP";
    }

    // validate password
    if (isEmpty(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Please enter password";
    } else if (!passwordRegex.test(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg =
        "Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
    } else if (password.length < 8) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Password length must be of 8-15";
    } else if (password !== newPassword) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "New password and confirm password must be same";
    }

    // validate newPassword
    if (isEmpty(newPassword)) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "Please enter confirm password";
    } else if (!passwordRegex.test(newPassword)) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg =
        "Confirm Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
    } else if (newPassword.length < 8) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "Confirm password length must be of 8-15";
    } else if (newPassword !== password) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "New password and confirm password must be same";
    }

    setErrObj(error);
    if (valid) {
      // updatepassword();
      updatePasswordByOtp();
    }
  }

  async function updatepassword() {
    try {
      const response = await getAPIProgressData(
        Setting.endpoints.updatepassword,
        "POST",
        {
          opt: otp,
          old_password: password,
          new_password: newPassword,
          device_type: "web",
        },
        { Authorization: `Bearer ${token}` }
      );

      console.log("response =====>>> ", response);
      if (response.success) {
        toast.success(response.message);
        // move to create profile screen
        navigate("/create-profile");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error=====>>>>>", error);
      toast.error(error.toString());
    }
  }

  async function updatePasswordByOtp() {
    try {
      setBtnLoad("reset");
      const response = await getApiData(
        Setting.endpoints.updatePasswordOtp,
        "POST",
        {
          otp,
          password,
        }
      );

      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
      setBtnLoad("");
    } catch (error) {
      setBtnLoad("");
      console.log("error=====>>>>>", error);
      toast.error(error.toString());
    }
  }

  return (
    <div style={{ overflow:"scroll"}}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={{ paddingTop: 40}}
      >
        <Grid item xs={12} marginTop="30px">
          <Typography className={classes.welcomeTextStyle}>
            Welcome to Reno
          </Typography>
          <Typography className={classes.loginHeaderText}>
            Reset Password
          </Typography>
        </Grid>
        <Grid item xs={7} sm={5.5} md={4} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                outline
                label="OTP"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setErrObj({ ...errObj, otpErr: false, otpMsg: "" });
                }}
                inputProps={{ maxLength: 5 }}
                white={false}
                error={errObj.otpErr}
                helpertext={errObj.otpMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                outline
                label="New password"
                placeholder="Enter new password"
                value={password}
                type={showNewPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrObj({ ...errObj, passwordErr: false, passwordMsg: "" });
                }}
                white={false}
                error={errObj.passwordErr}
                helpertext={errObj.passwordMsg}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {!showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                outline
                label="Confirm password"
                placeholder="Enter confirm password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrObj({
                    ...errObj,
                    newPasswordErr: false,
                    newPasswordMsg: "",
                  });
                }}
                white={false}
                error={errObj.newPasswordErr}
                helpertext={errObj.newPasswordMsg}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={validation}
              >
                Reset Password
              </Button>
            </Grid> */}
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            gap={2}
            wrap="nowrap"
            marginTop={5}
            marginBottom={5}
            justifyContent="space-between"
          >
            <Grid item xs={6}>
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
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : resendViewVisible ? (
                  "Resend OTP"
                ) : (
                  `00:${timerCount}`
                )}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={validation}
              >
                {btnLoad === "reset" ? (
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
