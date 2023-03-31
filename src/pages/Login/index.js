import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import CInput from "../../components/CInput";
import GoogleLoginButton from "../../components/SocialLogin/GoogleLoginButton";
import Images from "../../config/images";
import { getApiData } from "../../utils/APIHelper";
import useStyles from "./styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const errorObj = {
  emailErr: false,
  passwordErr: false,
  emailMsg: "",
  passwordMsg: "",
};

const Login = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);
  const [btnLoad, setBtnLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleBtnLoad, setGoogleBtnLoad] = useState(false);

  // this function checks validation of login field
  function validation() {
    const error = { ...errObj };
    let valid = true;

    // validate email
    if (isEmpty(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter email";
    } else if (!emailRegex.test(email)) {
      valid = false;
      error.emailErr = true;
      error.emailMsg = "Please enter valid email";
    }

    // validate password
    if (isEmpty(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Please enter password";
    } else if (password.length < 8) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Password length must be of 8-15";
    }

    setErrObj(error);
    if (valid) {
      loginUser();
    }
  }

  // this function for login user
  async function loginUser() {
    setBtnLoad(true);
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email,
        password,
        device_type: "web",
      });

      const socialData = {
        email,
        password,
      };

      if (response.success) {
        dispatch(setUserData(response?.data));
        dispatch(setToken(response?.token));
        if (response?.is_new_user) {
          navigate("/signup", { state: { socialData } });
        } else if (
          response?.data?.contractor_data &&
          response?.data?.contractor_data?.profile_completed === "pending"
        ) {
          navigate("/create-profile");
        } else if (response?.data?.is_email_verified === false) {
          sendOtpVerifyingApiCall(response?.data);
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response.message);
      }
      setBtnLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setBtnLoad(false);
      toast.error(error.toString());
    }
  }

  // this function for login user
  async function googleDataApiCall(googleCode) {
    try {
      setGoogleBtnLoad(true);
      const response = await getApiData(Setting.endpoints.googleData, "POST", {
        code: googleCode,
      });

      if (response.success) {
        if (!isEmpty(response?.data)) {
          socialLoginApiCall(response?.data, "google");
        }
      } else {
        toast.error(response.message);
        setGoogleBtnLoad(false);
      }
    } catch (error) {
      console.log("🚀 ~ google data api call ~ error:", error);
      toast.error(error.toString());
      setGoogleBtnLoad(false);
    }
  }

  // social login
  async function socialLoginApiCall(socialData, type) {
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email: socialData?.email ? socialData?.email : "",
        password: socialData?.password ? socialData?.password : "",
        device_type: "web",
        social_connection: type ? type : "",
      });

      console.log("socialLoginApiCallresponse =====>>> ", response);
      if (response.success) {
        if (response?.is_new_user) {
          setGoogleBtnLoad(false);
          navigate("/signup", { state: { socialData, type } });
        } else if (
          response?.data?.contractor_data &&
          response?.data?.contractor_data?.profile_completed === "pending"
        ) {
          navigate("/create-profile");
        } else if (response?.data?.is_email_verified === false) {
          sendOtpVerifyingApiCall(response?.data);
        } else {
          setGoogleBtnLoad(false);
          dispatch(setUserData(response?.data));
          dispatch(setToken(response?.token));
          navigate("/dashboard");
        }
      } else {
        setGoogleBtnLoad(false);
        toast.error(response.message);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setGoogleBtnLoad(false);
      toast.error(error.toString());
    }
  }

  // this function if user is login but not verified email than we are sending otp again and move to otp screen
  async function sendOtpVerifyingApiCall(resultData) {
    try {
      const response = await getApiData(Setting.endpoints.resendOtp, "POST", {
        email: resultData?.email,
      });

      console.log("response ====resend otp=>>> ", response);
      if (response.success) {
        navigate("/otp-verify", { state: { data: resultData } });
      } else {
        toast.error(response.message);
      }
      setGoogleBtnLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:88 ~ resendOtp ~ error:", error);
      toast.error(error.toString() || "Something gone wrong! Please try again");
      setGoogleBtnLoad(false);
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
          <Typography className={classes.loginHeaderText}>Log in</Typography>
        </Grid>
        <Grid item xs={6} sm={5} md={4} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                outline
                label="Email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                }}
                white={false}
                error={errObj.emailErr}
                helpertext={errObj.emailMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                outline
                label="Password"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
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
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <NavLink to="">
              <Typography className={classes.menuTitleStyle}>
                Forget password?
              </Typography>
            </NavLink>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={validation}
                disabled={btnLoad}
              >
                {btnLoad ? (
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : (
                  "Sign in"
                )}
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <div className={classes.borderDivStyle} />
              <Typography className={classes.continueTextStyle}>
                Continue with
              </Typography>
              <div className={classes.borderDivStyle} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 18 }}>
              <GoogleOAuthProvider clientId={Setting.GOOGLE_CLIENT_ID}>
                <GoogleLoginButton
                  loader={googleBtnLoad}
                  onGoogleDone={(val) => googleDataApiCall(val?.code)}
                />
              </GoogleOAuthProvider>
              <div className={classes.socialContainerStyle}>
                <img
                  src={Images.fb}
                  alt="facebook"
                  className={classes.socialImgStyle}
                />
                <Typography className={classes.socialTextStyle}>
                  Facebook
                </Typography>
              </div>
              <div className={classes.socialContainerStyle}>
                <img
                  src={Images.apple}
                  alt="apple"
                  className={classes.socialImgStyle}
                />
                <Typography className={classes.socialTextStyle}>
                  Apple
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.needAccountContainer}>
              <Typography className={classes.accountTextStyle}>
                Need an account?{" "}
              </Typography>
              <NavLink to="/signup" className={classes.linkStyle}>
                <Typography
                  className={`${classes.menuTitleStyle} ${classes.mrL3}`}
                >
                  Create an account
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
