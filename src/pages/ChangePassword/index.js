import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import CInput from "../../components/CInput";
import { getAPIProgressData, getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const errorObj = {
  oldPasswordErr: false,
  oldPasswordMsg: "",
  newPasswordErr: false,
  newPasswordMsg: "",
  passwordErr: false,
  passwordMsg: "",
};

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);
  const [buttonLoader, setButtonLoader] = useState(false);
  const { token } = useSelector((state) => state.auth);

  function validatePassword() {
    const error = { ...errObj };
    let valid = true;
    const passwordRegex =
      /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z]))(?=.*[!@#$%^&*])((?=.*[A-Z])))(?=.{8,})/;

    if (isEmpty(oldPassword)) {
      valid = false;
      error.oldPasswordErr = true;
      error.oldPasswordMsg = "Please enter old password";
    }

    if (isEmpty(newPassword)) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "Please enter password";
    } else if (newPassword.length < 8) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "Password length must be of 8-15";
    } else if (!passwordRegex.test(newPassword)) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg =
        "Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
    } else if (newPassword !== password) {
      valid = false;
      error.newPasswordErr = true;
      error.newPasswordMsg = "New password and confirm password must be same";
    }

    if (isEmpty(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Please enter confirm password";
    } else if (!passwordRegex.test(password)) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg =
        "Confirm Password must include more than 8 characters, at least one number, one letter, one capital letter and one symbol";
    } else if (password.length < 8) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "Confirm password length must be of 8-15";
    } else if (password !== newPassword) {
      valid = false;
      error.passwordErr = true;
      error.passwordMsg = "New password and confirm password must be same";
    }

    setErrObj(error);
    if (valid) {
      updatepassword();
    }
  }

  async function updatepassword() {
    setButtonLoader(true);
    try {
      const response = await getApiData(
        Setting.endpoints.updatepassword,
        "POST",
        {
          old_password: oldPassword,
          new_password: password,
        },
        {}
      );

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setButtonLoader(false);
    } catch (error) {
      console.log("error=====>>>>>", error);
      toast.error(error.toString());
      setButtonLoader(false);
    }
  }

  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={"wrap"}
      gap={2}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Typography variant="h5">Change Password</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        padding={isMobile ? "10px 0" : "10px 20px"}
      >
        <Grid
          item
          container
          style={{
            border: "1px solid #F2F4F7",
            padding: isMobile ? 10 : 20,
          }}
        >
          <Grid item xs={12}>
            <CInput
              label="Old password"
              placeholder="Enter Old password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setErrObj({
                  ...errObj,
                  oldPasswordErr: false,
                  oldPasswordMsg: "",
                });
              }}
              white={false}
              error={errObj.oldPasswordErr}
              helpertext={errObj.oldPasswordMsg}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {!showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CInput
              label="New password"
              placeholder="Enter new password"
              value={newPassword}
              type={showNewPassword ? "text" : "password"}
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
              label="Confirm password"
              placeholder="Enter confirm password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrObj({
                  ...errObj,
                  passwordErr: false,
                  passwordMsg: "",
                });
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
            <Button fullWidth variant="contained" onClick={validatePassword}>
              {buttonLoader ? (
                <CircularProgress size={26} style={{ color: "#fff" }} />
              ) : (
                "Update Password"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
