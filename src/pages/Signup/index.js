import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import PhoneInput from "react-phone-input-2";
import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from "google-libphonenumber";
import "react-phone-input-2/lib/style.css";
import CInput from "../../components/CInput";
import { getApiData } from "../../utils/APIHelper";
import authActions from "../../redux/reducers/auth/actions";
import { Setting } from "../../utils/Setting";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const errorObj = {
  unameErr: false,
  emailErr: false,
  phoneErr: false,
  passwordErr: false,
  confirmPasswordErr: false,
  unameMsg: "",
  emailMsg: "",
  phoneMsg: "",
  passwordMsg: "",
  confirmPasswordMsg: "",
};

const Signup = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location?.state ? location?.state : {};
  const phoneUtil = PhoneNumberUtil.getInstance();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setUserData, setToken } = authActions;
  const passwordRegex =
    /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z]))(?=.*[!@#$%+:^=<(){}[\]~>_?`|'";,.&*€₹£])((?=.*[A-Z])))(?=.{8,})/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [state, setState] = useState({
    uname: "",
    email: "",
    pCode: "971",
    countryCode: "AE",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [errObj, setErrObj] = useState(errorObj);
  const [btnLoad, setBtnLoad] = useState(false);
  const [phonePlaceholder, setPhonePlaceholder] = useState("");
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    setState({
      ...state,
      email:
        locationState?.socialData?.email || locationState?.data?.email || "",
      uname: locationState?.data?.username ? locationState?.data?.username : "",
    });
  }, []);

  useEffect(() => {
    const exampleNumber1 = phoneUtil.getExampleNumberForType(
      "ae",
      PhoneNumberType.MOBILE
    );
    const formattedExampleNumber1 = phoneUtil.format(
      exampleNumber1,
      PhoneNumberFormat.NATIONAL
    );
    setPhonePlaceholder(formattedExampleNumber1);
  }, []);

  // this function for to get location detail
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error(error));
  }, []);

  // check username is valid or not
  function isValidUsername(username) {
    return username.length >= 3 && username.length <= 20;
  }

  // this function checks validation of login field
  function validation() {
    const { uname, email, phone, password, countryCode, confirmPassword } =
      state;
    const error = { ...errObj };
    let valid = true;

    // validate name
    if (isEmpty(uname)) {
      valid = false;
      error.unameErr = true;
      error.unameMsg = "Please enter user name";
    } else if (!isValidUsername(uname)) {
      valid = false;
      error.unameErr = true;
      error.unameMsg = "Username must be between 3 to 20 characters in long.";
    }

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

    if (
      locationState?.type === "google" ||
      locationState?.type === "fb" ||
      locationState?.type === "apple"
    ) {
    } else {
      // validate password
      if (isEmpty(password)) {
        valid = false;
        error.passwordErr = true;
        error.passwordMsg = "Please enter password";
      } else if (password.length < 8) {
        valid = false;
        error.passwordErr = true;
        error.passwordMsg = "Password length must be of 8-15";
      } else if (!passwordRegex.test(password)) {
        valid = false;
        error.passwordErr = true;
        error.passwordMsg =
          "Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
      }

      // validate confirm password
      if (isEmpty(confirmPassword)) {
        valid = false;
        error.confirmPasswordErr = true;
        error.confirmPasswordMsg = "Please enter confirm password";
      } else if (!passwordRegex.test(confirmPassword)) {
        valid = false;
        error.confirmPasswordErr = true;
        error.confirmPasswordMsg =
          "Confirm Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
      } else if (confirmPassword.length < 8) {
        valid = false;
        error.confirmPasswordErr = true;
        error.confirmPasswordMsg = "Confirm password length must be of 8-15";
      } else if (confirmPassword !== password) {
        valid = false;
        error.confirmPasswordErr = true;
        error.confirmPasswordMsg = "Password and confirm password must be same";
      }
    }

    // Validate phone
    if (isEmpty(phone)) {
      valid = false;
      error.phoneErr = true;
      error.phoneMsg = "Please enter phone number";
    } else if (!isEmpty(phone) && !isEmpty(countryCode)) {
      const phoneNumber1 = phoneUtil.parse(phone, countryCode);
      const isValid = phoneUtil.isValidNumber(phoneNumber1);
      if (!isValid) {
        valid = false;
        error.phoneErr = true;
        error.phoneMsg = `Please enter valid phone number Ex: ${phonePlaceholder}`;
      }
    }

    setErrObj(error);
    if (valid) {
      registerUser();
    }
  }

  // this function for registering user
  async function registerUser() {
    setBtnLoad(true);
    const { uname, email, phone, password, pCode } = state;
    const address = `${locationData?.city ? locationData?.city + "," : ""} ${
      locationData?.region ? locationData?.region + "," : ""
    } ${locationData?.country_name || ""}`;

    let data = {
      username: uname,
      email,
      phone_code: pCode ? pCode : "",
      phone_no: phone,
      password,
      role: "contractor",
      device_type: "web",
      device_name: locationData?.ip || "",
      login_address: address,
    };

    if (locationState?.type) {
      data.social_connection = locationState?.type;
    }

    if (locationState?.data?.social_connection_id) {
      data.social_connection_id = locationState?.data?.social_connection_id;
      data.token = locationState?.socialData?.password;
    }

    try {
      const response = await getApiData(Setting.endpoints.signup, "POST", data);
      console.log("response =register user====>>> ", response);

      if (response.success) {
        toast.success(response?.message || "");
        if (response?.is_email_verified === false) {
          navigate("/otp-verify", { state: { data } });
        } else {
          dispatch(setToken(response?.token));
          dispatch(setUserData(response?.data));
          navigate("/create-profile");
        }
      } else {
        toast.error(response.message);
      }
      setBtnLoad(false);
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ registeruser ~ error:", error);
      setBtnLoad(false);
      toast.error(error.toString());
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
            Create an account
          </Typography>
        </Grid>
        <Grid item xs={10} sm={8} md={4} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                outline
                label="User Name"
                placeholder="Enter user name"
                value={state.uname}
                onChange={(e) => {
                  setState({ ...state, uname: e.target.value });
                  setErrObj({ ...errObj, unameErr: false, unameMsg: "" });
                }}
                inputProps={{ maxLength: 20 }}
                white={false}
                error={errObj.unameErr}
                helpertext={errObj.unameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                outline
                label="Email"
                placeholder="Enter email address"
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                }}
                white={false}
                error={errObj.emailErr}
                helpertext={errObj.emailMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Phone
              </InputLabel>
              <TextField
                fullWidth
                placeholder={
                  state.pCode ? phonePlaceholder : "Enter phone number"
                }
                style={{ marginBottom: 20 }}
                value={state.phone}
                onChange={(e) => {
                  setState({ ...state, phone: e.target.value });
                  setErrObj({ ...errObj, phoneErr: false, phoneMsg: "" });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ marginLeft: "-13px", marginRight: -5 }}
                    >
                      <PhoneInput
                        country={"ae"}
                        value={state.pCode}
                        onChange={(code, country) => {
                          const countryUpperCase =
                            country?.countryCode.toUpperCase();
                          setState({
                            ...state,
                            pCode: code,
                            countryCode: countryUpperCase,
                            phone: "",
                          });
                          const exampleNumber1 =
                            phoneUtil.getExampleNumberForType(
                              country?.countryCode,
                              PhoneNumberType.MOBILE
                            );
                          const formattedExampleNumber1 = phoneUtil.format(
                            exampleNumber1,
                            PhoneNumberFormat.NATIONAL
                          );
                          setPhonePlaceholder(formattedExampleNumber1);
                        }}
                      />
                      <Typography className={classes.countryCodeStyle}>
                        +{state?.pCode}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                className={classes.pickerInput}
                error={errObj.phoneErr}
                helperText={errObj.phoneMsg}
              />
            </Grid>
            {locationState?.type === "google" ||
            locationState?.type === "fb" ||
            locationState?.type === "apple" ? null : (
              <>
                <Grid item xs={12}>
                  <CInput
                    outline
                    label="Password"
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    value={state.password}
                    passValue={state?.password}
                    passwordValidation
                    inputProps={{ maxLength: 15 }}
                    onChange={(e) => {
                      setState({ ...state, password: e.target.value });
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
                <Grid item xs={12}>
                  <CInput
                    outline
                    label="Confirm password"
                    placeholder="Enter confirm password"
                    required
                    type={showCPassword ? "text" : "password"}
                    value={state.confirmPassword}
                    onChange={(e) => {
                      setState({ ...state, confirmPassword: e.target.value });
                      setErrObj({
                        ...errObj,
                        confirmPasswordErr: false,
                        confirmPasswordMsg: "",
                      });
                    }}
                    white={false}
                    error={errObj.confirmPasswordErr}
                    helpertext={errObj.confirmPasswordMsg}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowCPassword(!showCPassword)}
                        >
                          {!showCPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                onClick={validation}
                disabled={btnLoad}
              >
                {btnLoad ? (
                  <CircularProgress style={{ color: "#fff" }} size={26} />
                ) : (
                  "Sign up now"
                )}
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.needAccountContainer}>
              <Typography className={classes.accountTextStyle}>
                Already have an account?{" "}
              </Typography>
              <NavLink to="/login" className={classes.linkStyle}>
                <Typography
                  className={`${classes.menuTitleStyle} ${classes.mrL3}`}
                >
                  Log in
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
