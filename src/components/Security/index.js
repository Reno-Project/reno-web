import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
  Switch,
} from "@mui/material";
import Images from "../../config/images";
import React, { useState } from "react";
import CInput from "../../components/CInput";
import useStyles from "./styles";
import { styled } from "@mui/material/styles";
export default function Security() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={"nowrap"}
      gap={2}
      justifyContent={"center"}
    >
      <Grid item lg={4}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={9}>
        <Typography variant="h5">Logging in Settings</Typography>
        <Typography className={classes.language}>Lorem Ipsum has been the industry's standard dummy text ever since.</Typography>

        <Grid
          item
          container
          style={{
            border: "1px solid #F2F4F7",
            padding: 20,
            marginTop: 20,
            backgroundColor:'#F9F9FB'
          }}
          alignItems="center"
          justifyContent={'flex-end'}
        >
          <Grid item xs={12} sm={12} md={9} lg={9} >
            <Typography className={classes.TextStyle}>Allow Login attempts</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3}>
            <CInput
              outline
              placeholder="Enter Allow ..."
              white={false}
              type="number"
              controls={false}
              inputProps={{
                className: classes.myOtpInput
              }}
            />
          </Grid>
          <Divider width={'100%'} />
          <Grid item container style={{ marginBottom: 15 }}>
            <Grid item xs={12} md={9} sm={12} lg={9} style={{ marginTop: 20 }}>
              <Typography className={classes.TextStyle}>Phone Verifications</Typography>
              <Typography className={classes.language}>Your phone is not verified with Reno. Click Verify Now
                to complete phone verification</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={3} style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ paddingLeft: "20px", paddingRight: "20px", width: '100%' }}
              >
                Verify now
              </Button>
            </Grid>
          </Grid>
          <Divider width={'100%'} />
          <Grid item container>
            <Grid item xs={12} md={7} sm={12} lg={9} style={{ marginTop: 20 }}>
              <Typography className={classes.TextStyle} >Two factors authentications</Typography>
              <Typography className={classes.language} >We will send an authentication code via SMS, email or fiverr notification
                when using an unrecognised device.</Typography>
            </Grid>
            <Grid xs={12} md={3} sm={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={2} lg={1} style={{ marginTop: 20 }} justifyContent={'flex-end'}>
              <IOSSwitch sx={{ m: 0 }} defaultChecked />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          style={{
            border: "1px solid #F2F4F7",
            padding: 20,
            marginTop: 20,
            backgroundColor:'#F9F9FB'
          }}
          alignItems="center"
          justifyContent={'flex-end'}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Connected Devices</Typography>
            <Typography className={classes.language}>Lorem Ipsum has been the industry's standard dummy text ever since.</Typography>
          </Grid>
          <Grid container
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Grid item lg={1} md={1} xs={1} sm={1} style={{ marginTop: 10, justifyContent: 'center', display: 'flex' }}>
              <img
                src={Images.laptop}
                alt="laptop"
                className={classes.imgStyle}
              />
            </Grid>
            <Grid xs={10} md={10} lg={9} sm={10} item container >
              <Typography className={classes.TextStyle}>Chrome 109, Windows </Typography>
              <Typography className={classes.TextDeviceStyle}>THIS DEVICE</Typography>
              <Typography className={classes.language}>Last Activity 13 minutes ago • Dubai, United Arab Emirates</Typography>
            </Grid>
            <Grid lg={2} md={12} xs={12} sm={12} style={{ marginTop: 5 }}><Typography className={classes.TextStyle}>signout </Typography></Grid>
          </Grid>
          <Grid container
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <Grid item lg={1} md={1} xs={1} sm={1} style={{ marginTop: 10, justifyContent: 'center', display: 'flex' }}>
              <img
                src={Images.Phone}
                alt="Phone"
                className={classes.imgStyle}
              />
            </Grid>

            <Grid xs={10} md={10} lg={9} sm={10} item >
              <Typography className={classes.TextStyle}>iPhone, iOS App  </Typography>
              <Typography className={classes.language}>Last Activity 1 hour ago • Cairo, Egypt</Typography>
            </Grid>
            <Grid lg={2} md={12} xs={12} sm={12} style={{ marginTop: 5 }} ><Typography className={classes.TextStyle}>signout </Typography></Grid>
          </Grid>
          <Divider width={'100%'} />
          <Grid xs={12} md={5} lg={5} sm={5} style={{ marginTop: 15 }}>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={4} sm={12} item style={{ marginTop: 15 }} >
            <Typography className={classes.language}>Signout  from All devices</Typography>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={3} sm={12} style={{ marginTop: 15 }}>
            <Button
              variant="contained"
              color="primary"
              style={{ paddingLeft: "10px", paddingRight: "10px" }}

            >
              Sign out now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
