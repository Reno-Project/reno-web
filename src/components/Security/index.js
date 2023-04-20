import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Divider, Switch } from "@mui/material";
import Images from "../../config/images";
import CInput from "../../components/CInput";
import useStyles from "./styles";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import { isMobile } from "react-device-detect";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
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

export default function Security() {
  const classes = useStyles();
  const { userData, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [status, setStatus] = useState("");

  useEffect(() => {
    getUserDetailsByIdApiCall();
  }, [status]);

  useEffect(() => {
    deviceList();
  }, []);

  async function getUserDetailsByIdApiCall() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.contarctorById}/${userData?.id}`,
        "GET",
        {}
      );
      if (response.success) {
        dispatch(setUserData(response?.data));
        setStatus(response?.data?.is_two_factor_verified);
      } else {
        setStatus(userData?.is_two_factor_verified);
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setStatus(userData?.is_two_factor_verified);
    }
  }

  async function twoFectorAuth(val) {
    try {
      const response = await getApiData(
        `${Setting.endpoints.twoFactorSetting}`,
        "post",
        {
          is_two_factor_verified: val ? 1 : 0,
        }
      );
      if (response?.success) {
        getUserDetailsByIdApiCall();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("ERROR=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }

  async function deviceList() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.logindeviceslist}/${userData?.id}`,
        "POST",
        {}
      );
      console.log("response=====>>>>>", response);
      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("error=====>>>>>", error);
    }
  }

  async function logoutallApi() {
    try {
      const response = await getApiData(
        `${Setting.endpoints.logoutall}`,
        "post",
        {},
        { Authorization: `Bearer ${token}` }
      );
      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("error=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }

  return (
    <Grid
      container
      padding={"20px 0"}
      wrap={"nowrap"}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <Typography variant="h5" fontFamily={"'Roobert-Regular'"}>
          Logging in Settings
        </Typography>
        <Grid
          item
          container
          style={{
            border: "1px solid #F2F4F7",
            padding: "0 20px 20px",
            marginTop: 20,
            backgroundColor: "#F9F9FB",
          }}
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <Typography
              className={classes.TextStyle}
              paddingTop={isMobile ? 3 : 0}
              fontFamily={"Roobert-Regular"}
            >
              Allow login attempts
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={3}>
            <CInput
              outline
              placeholder="Enter allow ..."
              white={false}
              type="number"
              controls={false}
              inputProps={{
                className: classes.myOtpInput,
              }}
            />
          </Grid>
          <Divider width={"100%"} />
          <Grid item container style={{ marginBottom: 15 }}>
            <Grid item xs={12} md={9} sm={12} lg={9} style={{ marginTop: 20 }}>
              <Typography
                className={classes.TextStyle}
                fontFamily={"Roobert-Regular"}
              >
                Phone verifications
              </Typography>
              <Typography
                className={classes.language}
                fontFamily={"Roobert-Regular"}
                paddingRight={2}
              >
                Your phone is not verified with Reno. Click Verify Now to
                complete phone verification
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  width: "100%",
                }}
              >
                Verify now
              </Button>
            </Grid>
          </Grid>
          <Divider width={"100%"} />
          <Grid item container justifyContent={"space-between"}>
            <Grid item xs={10} sm={9} md={8} style={{ marginTop: 20 }}>
              <Typography
                className={classes.TextStyle}
                fontFamily={"Roobert-Regular"}
              >
                Two factors authentications
              </Typography>
              <Typography
                className={classes.language}
                fontFamily={"Roobert-Regular"}
              >
                We will send an authentication code via SMS, email or fiverr
                notification when using an unrecognised device.
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              style={{ marginTop: 20 }}
              justifyContent={"flex-end"}
            >
              <IOSSwitch
                sx={{ m: 0 }}
                checked={status}
                onChange={(event) => {
                  twoFectorAuth(event.target.checked);
                }}
              />
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
            backgroundColor: "#F9F9FB",
          }}
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontFamily={"Roobert-Regular"}
              marginBottom={2}
            >
              Connected devices
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            wrap="nowrap"
            justifyContent={"space-between"}
            style={{ marginTop: 10, marginBottom: 10 }}
            gap={1}
          >
            <Grid item display={"flex"} gap={1}>
              <Grid
                item
                xs={1}
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img
                  src={Images.laptop}
                  alt="laptop"
                  className={classes.imgStyle}
                />
              </Grid>
              <Grid item>
                <Typography
                  fontFamily={"Roobert-Regular"}
                  className={classes.TextStyle}
                >
                  Chrome 109, Windows
                  <span className={classes.TextDeviceStyle}>THIS DEVICE</span>
                </Typography>
                <Typography
                  fontFamily={"Roobert-Regular"}
                  className={classes.language}
                >
                  Last activity 13 minutes ago • Dubai, United Arab Emirates
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Button style={{ alignItems: "center" }} variant="outlined">
                Signout
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            wrap="nowrap"
            style={{ marginTop: 10, marginBottom: 10 }}
            gap={1}
          >
            <Grid item display={"flex"} gap={isMobile ? 1 : 2}>
              <Grid
                item
                xs={1}
                style={{
                  marginTop: 10,
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <img
                  src={Images.Phone}
                  alt="phone"
                  className={classes.imgStyle}
                />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.TextStyle}
                  fontFamily={"Roobert-Regular"}
                >
                  IPhone, iOS App
                </Typography>
                <Typography
                  className={classes.language}
                  fontFamily={"Roobert-Regular"}
                >
                  Last activity 1 hour ago • Cairo, Egypt
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="outlined">Signout</Button>
            </Grid>
          </Grid>

          <Divider width={"100%"} />
          <Grid
            item
            container
            marginTop={2}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={2}
          >
            <Grid item>
              <Typography className={classes.language}>
                Signout from all other devices
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
                onClick={logoutallApi}
              >
                Sign out now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
