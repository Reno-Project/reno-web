import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import PhoneInput from "react-phone-input-2";
import { PhoneNumberUtil } from "google-libphonenumber";
import "react-phone-input-2/lib/style.css";
import CInput from "../../components/CInput";
import useStyles from "./styles";

const errorObj = {
  unameErr: false,
  emailErr: false,
  phoneErr: false,
  passwordErr: false,
  unameMsg: "",
  emailMsg: "",
  phoneMsg: "",
  passwordMsg: "",
};

const Signup = (props) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const classes = useStyles();
  const userNameRegex = /^[a-zA-Z0-9_-]+$/;
  const passwordRegex =
    /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z]))(?=.*[!@#$%^&*])((?=.*[A-Z])))(?=.{8,})/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [state, setState] = useState({
    uname: "",
    email: "",
    pCode: "971",
    countryCode: "AE",
    phone: "",
    password: "",
  });
  const [errObj, setErrObj] = useState(errorObj);

  // check username is valid or not
  function isValidUsername(username) {
    return username.length >= 3 && username.length <= 20;
  }

  // this function checks validation of login field
  function validation() {
    const { uname, email, phone, password, countryCode } = state;
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
    } else if (!userNameRegex.test(uname)) {
      valid = false;
      error.unameErr = true;
      error.unameMsg =
        "Username must include letters, numbers, underscores and hyphens.";
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
        error.phoneMsg = "Please enter valid phone number";
      }
    } 

    setErrObj(error);
    if (valid) {
      // loginUser();
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
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                label="User Name"
                placeholder="Enter user name"
                value={state.uname}
                onChange={(e) => {
                  setState({ ...state, uname: e.target.value });
                  setErrObj({ ...errObj, unameErr: false, unameMsg: "" });
                }}
                white={false}
                error={errObj.unameErr}
                helperText={errObj.unameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                label="Email"
                placeholder="Enter email address"
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                  setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                }}
                white={false}
                error={errObj.emailErr}
                helperText={errObj.emailMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Phone
              </InputLabel>
              <TextField
                fullWidth
                placeholder="Enter phone number"
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
                      style={{ marginLeft: "-13px" }}
                    >
                      <PhoneInput
                        country={"ae"}
                        value={state.pCode}
                        onChange={(code, country) => {
                          const countryUpperCase = country?.countryCode.toUpperCase();
                          setState({ ...state, pCode: code, countryCode: countryUpperCase });
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                className={classes.pickerInput}
                error={errObj.phoneErr}
                helperText={errObj.phoneMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                label="Password"
                placeholder="Enter password"
                value={state.password}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                  setErrObj({ ...errObj, passwordErr: false, passwordMsg: "" });
                }}
                white={false}
                error={errObj.passwordErr}
                helperText={errObj.passwordMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginBottom: 20 }}
                onClick={validation}
              >
                Sign up now
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
