import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import CInput from "../../components/CInput";
import Images from "../../config/images";
import useStyles from "./styles";

const errorObj = {
  emailErr: false,
  passwordErr: false,
  emailMsg: "",
  passwordMsg: "",
};

const Login = (props) => {
  const classes = useStyles();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);

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

    console.log("erorr ==>>", error);
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
          <Typography className={classes.loginHeaderText}>Log in</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                label="Email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrObj({ ...errObj, emailErr: false, emailMsg: "" });
                }}
                white={false}
                error={errObj.emailErr}
                helperText={errObj.emailMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrObj({ ...errObj, passwordErr: false, passwordMsg: "" });
                }}
                white={false}
                error={errObj.passwordErr}
                helperText={errObj.passwordMsg}
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
              >
                Sign in
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
              <div className={classes.socialContainerStyle}>
                <img
                  src={Images.google}
                  alt="google"
                  className={classes.socialImgStyle}
                />
                <Typography className={classes.socialTextStyle}>
                  Google
                </Typography>
              </div>
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
