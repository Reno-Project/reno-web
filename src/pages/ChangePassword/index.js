import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CInput from "../../components/CInput";

const errorObj = {
  cnameErr: false,
  cnameMsg: "",
  descriptionErr: false,
  descriptionMsg: "",
  emailErr: false,
  emailMsg: "",
  webErr: false,
  webMsg: "",
  phoneErr: false,
  phoneMsg: "",
  yearErr: false,
  yearMsg: "",
  employeeErr: false,
  employeeMsg: "",
  contractErr: false,
  contarctMsg: "",
  expertiseErr: false,
  expertiseMsg: "",
  priceErr: false,
  priceMsg: "",
  locationErr: false,
  locationMsg: "",
  certiErr: false,
  certiMsg: "",
  licenseErr: false,
  licenseMsg: "",
  registrationErr: false,
  registrationMsg: "",
  bnameErr: false,
  bnameMsg: "",
  ibanErr: false,
  ibanMsg: "",
  bankErr: false,
  bankMsg: "",
  accErr: false,
  accMsg: "",
  swiftErr: false,
  swiftMsg: "",
  addErr: false,
  addMsg: "",
  socialErr: false,
  socialMsg: "",
  linkedInErr: false,
  linkedInMsg: "",
  instaErr: false,
  instaMsg: "",
};

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errObj, setErrObj] = useState(errorObj);

  return (
    <>
      <Grid item lg={4}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={9} padding="10px 20px">
        <Typography variant="h5">Change Password</Typography>
        <Grid
          item
          container
          style={{
            border: "1px solid #F2F4F7",
            padding: 20,
            marginTop: 20,
          }}
        >
          <Grid item xs={12}>
            <CInput
              label="Old password"
              placeholder="Enter Old password"
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
              //     endAdornment={
              //       <InputAdornment position="end">
              //         <IconButton
              //           aria-label="toggle password visibility"
              //           onClick={() => setShowNewPassword(!showNewPassword)}
              //         >
              //           {!showNewPassword ? <Visibility /> : <VisibilityOff />}
              //         </IconButton>
              //       </InputAdornment>
              //     }
            />
          </Grid>

          <Grid item xs={12}>
            <CInput
              label="New password"
              placeholder="Enter new password"
              value={password}
              type={showNewPassword ? "text" : "password"}
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
        </Grid>
        <Grid
          xs={12}
          item
          container
          wrap="nowrap"
          gap={2}
          style={{
            margin: "25px 0",
            justifyContent: "center",
          }}
        >
          <Grid item xs={6}>
            <Button style={{ width: "100%" }} variant="outlined">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ minWidth: "135px", width: "100%" }}
              variant="contained"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
