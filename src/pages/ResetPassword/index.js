import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import CInput from "../../components/CInput";
import Images from "../../config/images";
import useStyles from "./styles";

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
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);

  // this function checks validation of login field
  function validation() {
    const error = { ...errObj };
    let valid = true;

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

    // validate newPassword
    if (isEmpty(newPassword)) {
        valid = false;
        error.newPasswordErr = true;
        error.newPasswordMsg = "Please enter confirm password";
      } else if (newPassword.length < 8) {
        valid = false;
        error.newPasswordErr = true;
        error.newPasswordMsg = "Confirm password length must be of 8-15";
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
          <Typography className={classes.loginHeaderText}>Reset Password</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={12}>
              <CInput
                label="New password"
                placeholder="Enter new password"
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
            <Grid item xs={12}>
              <CInput
                label="Confirm password"
                placeholder="Enter confirm password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrObj({ ...errObj, newPasswordErr: false, newPasswordMsg: "" });
                }}
                white={false}
                error={errObj.newPasswordErr}
                helperText={errObj.newPasswordMsg}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                onClick={validation}
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
