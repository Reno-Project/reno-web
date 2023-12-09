import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
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
import FacebookLoginButton from "../../components/SocialLogin/FacebookLoginButton";
import AppleLoginButton from "../../components/SocialLogin/AppleLoginButton";
import { getApiData } from "../../utils/APIHelper";
import useStyles from "./styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { onMessageListener } from "../../push-notification";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import loginCover from "../../assets/images/loginCover.png";

const errorObj = {
  emailErr: false,
  passwordErr: false,
  forgotEmailErr: false,
  emailMsg: "",
  passwordMsg: "",
  forgotEmailMsg: "",
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
  const [btnForgotLoad, setBtnForgotLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialBtnLoad, setSocialBtnLoad] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [forgotEmail, setForgotEmail] = useState("");
  const theme = useTheme();
  const [visibleForgotModal, setVisibleForgotModal] = useState(false);
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
    p: 4,
  };

  // this function for to get location detail
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    onMessageListener();
  }, []);

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
    const address = `${locationData?.city ? locationData?.city + "," : ""} ${
      locationData?.region ? locationData?.region + "," : ""
    } ${locationData?.country_name || ""}`;
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email,
        password,
        device_type: "web",
        device_name: locationData?.ip || "",
        login_address: address,
      });

      const socialData = {
        email,
        password,
      };

      if (response.success) {
        CometChatUIKit.loginWithAuthToken(process.env.REACT_APP_AUTHKEY);
        dispatch(setToken(response?.token));
        if (response?.is_new_user) {
          navigate("/signup", { state: { socialData } });
        } else if (
          response?.is_email_verified === false ||
          response?.data?.is_email_verified === false
        ) {
          navigate("/otp-verify", {
            state: { data: response?.data, type: "email" },
          });
        } else if (
          response?.is_phone_verified === false ||
          response?.data?.is_phone_verified === false
        ) {
          navigate("/phone-verify", {
            state: { data: response?.data, type: "phone" },
          });
        } else if (response?.data?.is_two_factor_verified) {
          console.log("hiiiiiiiiiii");
          navigate("/otp-verify", {
            state: {
              data: response?.data,
              type: "email",
              subtype: "two_factor",
            },
          });
          // sendOtpVerifyingApiCall(response?.data);
        } else if (
          response?.data?.contractor_data &&
          response?.data?.contractor_data?.profile_completed === "pending"
        ) {
          dispatch(setUserData(response?.data));
          navigate("/create-profile");
        } else {
          dispatch(setUserData(response?.data));
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
      setSocialBtnLoad("google");
      const response = await getApiData(Setting.endpoints.googleData, "POST", {
        code: googleCode,
      });

      if (response.success) {
        if (!isEmpty(response?.data)) {
          socialLoginApiCall(response?.data, "google");
        }
      } else {
        toast.error(response.message);
        setSocialBtnLoad("");
      }
    } catch (error) {
      console.log("🚀 ~ google data api call ~ error:", error);
      toast.error(error.toString());
      setSocialBtnLoad("");
    }
  }

  // social login
  async function socialLoginApiCall(socialData, type) {
    setSocialBtnLoad(type);
    const address = `${locationData?.city ? locationData?.city + "," : ""} ${
      locationData?.region ? locationData?.region + "," : ""
    } ${locationData?.country_name || ""}`;
    try {
      const response = await getApiData(Setting.endpoints.login, "POST", {
        email: socialData?.email ? socialData?.email : "",
        password: socialData?.password ? socialData?.password : "",
        device_type: "web",
        social_connection: type ? type : "",
        device_name: locationData?.ip || "",
        login_address: address,
      });

      if (response.success) {
        dispatch(setToken(response?.token));
        if (response?.is_new_user) {
          setSocialBtnLoad("");
          navigate("/signup", {
            state: { socialData, type, data: response?.data },
          });
        } else if (
          response?.data?.contractor_data &&
          response?.data?.contractor_data?.profile_completed === "pending"
        ) {
          dispatch(setUserData(response?.data));
          navigate("/create-profile");
        } else if (
          response?.is_email_verified === false ||
          response?.data?.is_email_verified === false
        ) {
          navigate("/otp-verify", {
            state: { data: response?.data, type: "email" },
          });
        } else if (
          response?.is_phone_verified === false ||
          response?.data?.is_phone_verified === false
        ) {
          navigate("/phone-verify", {
            state: { data: response?.data, type: "phone" },
          });
        } else if (response?.data?.is_two_factor_verified) {
          dispatch(setUserData(response?.data));
          navigate("/otp-verify", {
            state: {
              data: response?.data,
              type: "email",
              subtype: "two_factor",
            },
          });
          // sendOtpVerifyingApiCall(response?.data);
        } else {
          dispatch(setUserData(response?.data));
          setSocialBtnLoad("");
          navigate("/dashboard");
        }
      } else {
        setSocialBtnLoad("");
        toast.error(response.message);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ loginUser ~ error:", error);
      setSocialBtnLoad("");
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
      setSocialBtnLoad("");
    } catch (error) {
      console.log("🚀 ~ file: index.js:88 ~ resendOtp ~ error:", error);
      toast.error(error.toString() || "Something gone wrong! Please try again");
      setSocialBtnLoad("");
    }
  }

  // this function checks forgot validation
  function forgotValidation() {
    const error = { ...errObj };
    let valid = true;
    // validate forgot email
    if (isEmpty(forgotEmail)) {
      valid = false;
      error.forgotEmailErr = true;
      error.forgotEmailMsg = "Please enter email";
    } else if (!emailRegex.test(forgotEmail)) {
      valid = false;
      error.forgotEmailErr = true;
      error.forgotEmailMsg = "Please enter valid email";
    }

    setErrObj(error);
    if (valid) {
      forgotPasswordApiCall();
    }
  }

  async function forgotPasswordApiCall() {
    try {
      setBtnForgotLoad(true);
      const response = await getApiData(
        Setting.endpoints.forgotPassword,
        "POST",
        {
          email: forgotEmail ? forgotEmail : "",
          device_type: "web",
        }
      );

      console.log("response ====forgot otp=>>> ", response);
      if (response.success) {
        navigate("/reset-password", { state: { data: forgotEmail } });
      } else {
        toast.error(response.message);
      }
      setBtnForgotLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:88 ~ resendOtp ~ error:", error);
      toast.error(error.toString() || "Something gone wrong! Please try again");
      setBtnForgotLoad(false);
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            src={loginCover}
          />
        </Grid>
        <Grid
          item
          xs={6}
          // alignItems="center"
          // justifyContent="center"
          className={classes.container}
          flexDirection="column"
          style={{ paddingTop: 129 }}
        >
          <Grid item xs={12}>
            <Typography className={classes.welcomeTextStyle}>
              Welcome to Reno
            </Typography>
            <Typography className={classes.loginHeaderText}>Log in</Typography>
          </Grid>
          {/* form start */}
          <Grid item xs={10} sm={8} md={4} lg={9}>
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
                  className={classes.label}
                />
              </Grid>
              <Grid item xs={12}>
                <CInput
                  outline
                  label="Password"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className={classes.label}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrObj({
                      ...errObj,
                      passwordErr: false,
                      passwordMsg: "",
                    });
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      validation();
                    }
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
              <Typography
                onClick={() => {
                  setForgotEmail("");
                  setVisibleForgotModal(true);
                }}
                className={classes.menuTitleStyle}
              >
                Forget password?
              </Typography>
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
                    "Continue"
                  )}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                wrap="nowrap"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Grid xs={3}>
                  <div className={classes.borderDivStyle} />
                </Grid>
                <Grid item xs={5}>
                  <Typography className={classes.continueTextStyle}>
                    Or
                  </Typography>
                </Grid>
                <Grid xs={3}>
                  <div className={classes.borderDivStyle} />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 18 }}>
                <GoogleOAuthProvider clientId={Setting.GOOGLE_CLIENT_ID}>
                  <GoogleLoginButton
                    loader={socialBtnLoad === "google"}
                    onGoogleDone={(val) => googleDataApiCall(val?.code)}
                  />
                </GoogleOAuthProvider>
                <FacebookLoginButton
                  loader={socialBtnLoad === "fb"}
                  onSuccess={(response) => socialLoginApiCall(response, "fb")}
                />
                <AppleLoginButton
                  loader={socialBtnLoad === "apple"}
                  onSuccess={(response) =>
                    socialLoginApiCall(response, "apple")
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.needAccountContainer}>
                <Typography className={classes.accountTextStyle}>
                  Don’t have an account?
                </Typography>
                <NavLink to="/signup" className={classes.linkStyle}>
                  <Typography
                    className={`${classes.menuTitleStyle} ${classes.mrL3}`}
                  >
                    Sign Up
                  </Typography>
                </NavLink>
              </Grid>

              <Modal
                open={visibleForgotModal}
                onClose={() =>
                  btnForgotLoad ? null : setVisibleForgotModal(false)
                }
                closeAfterTransition
                disableAutoFocus
                slotProps={{ backdrop: Backdrop }}
                style={{ overflowY: "scroll" }}
              >
                <Fade in={visibleForgotModal}>
                  <Box sx={style}>
                    {/* <div className={classes.splitViewStyle}> */}
                    <Grid container justifyContent="center" alignItems="center">
                      <Typography className={classes.forgotHeaderText}>
                        Forget Password
                      </Typography>
                      <Grid item xs={12}>
                        <CInput
                          outline
                          label="Email"
                          placeholder="Enter email address"
                          value={forgotEmail}
                          onChange={(e) => {
                            setForgotEmail(e.target.value);
                            setErrObj({
                              ...errObj,
                              forgotEmailErr: false,
                              forgotEmailMsg: "",
                            });
                          }}
                          white={false}
                          error={errObj.forgotEmailErr}
                          helpertext={errObj.forgotEmailMsg}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          style={{ marginTop: 20, marginBottom: 20 }}
                          onClick={forgotValidation}
                          disabled={btnForgotLoad}
                        >
                          {btnForgotLoad ? (
                            <CircularProgress
                              style={{ color: "#fff" }}
                              size={26}
                            />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                    {/* </div> */}
                  </Box>
                </Fade>
              </Modal>
            </Grid>
          </Grid>
          {/* form end */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
