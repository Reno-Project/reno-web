import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Divider,
  Switch,
  CircularProgress,
} from "@mui/material";
import Images from "../../config/images";
import CInput from "../../components/CInput";
import useStyles from "./styles";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";
import Cselect from "../CSelect";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import { isMobile } from "react-device-detect";
import _ from "lodash";
import ConfirmModel from "../ConfirmModel";

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
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setUserData } = authActions;
  const [status2FA, setStatus2FA] = useState("");
  const [loginDeviceList, setLoginDeviceList] = useState([]);
  const [loaderIndex, setLoaderIndex] = useState(false);
  const [visible, setVisible] = useState(false);
  const [attempts, setAttempts] = useState("");

  useEffect(() => {
    getUserDetailsByIdApiCall();
  }, [status2FA]);

  useEffect(() => {
    deviceListApiCall();
  }, []);

  async function getUserDetailsByIdApiCall() {
    try {
      const response = await getApiData(Setting.endpoints.me, "GET", {});
      if (response.success) {
        dispatch(setUserData(response?.data));
        setStatus2FA(response?.data?.is_two_factor_verified);
        setAttempts(
          response?.data?.user_settings?.allow_login_attempts || "Unset"
        );
      } else {
        setStatus2FA(userData?.is_two_factor_verified);
        setAttempts("Unset");
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js:63 ~ by id api ~ error:", error);
      setStatus2FA(userData?.is_two_factor_verified);
      setAttempts("Unset");
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

  async function deviceListApiCall() {
    setLoaderIndex(true);
    try {
      const response = await getApiData(
        Setting.endpoints.logindeviceslist,
        "POST",
        {}
      );
      if (response?.success) {
        setLoginDeviceList(response?.data);
      } else {
        toast.error(response?.message);
      }
      setLoaderIndex(false);
    } catch (error) {
      console.log("error=====>>>>>", error);
      setLoaderIndex(false);
    }
  }

  async function logoutallApi() {
    setLoaderIndex(true);
    try {
      const response = await getApiData(
        `${Setting.endpoints.logoutall}`,
        "post",
        {}
      );
      if (response?.success) {
        setVisible(false);
        deviceListApiCall();
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      setLoaderIndex(false);
      console.log("error=====>>>>>", error);
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }

  async function singleDeviceLogoutApiCall(uItem, ind) {
    setLoaderIndex(ind);
    try {
      const response = await getApiData(
        `${Setting.endpoints.singleDeviceLogout}/${uItem?.id || ""}`,
        "GET",
        {}
      );
      if (response.success) {
        deviceListApiCall();
      } else {
        toast.error(response?.message);
      }
      setLoaderIndex("");
    } catch (error) {
      setLoaderIndex("");
      toast.error("Something went wrong");
    }
  }

  // this function for handle login attempts
  async function updateAttempts(val) {
    try {
      const response = await getApiData(
        Setting.endpoints.updateUserSetting,
        "post",
        {
          security_type: "allow_login_attempts",
          action: val === "Unset" ? 0 : Number(val),
        }
      );

      if (!response?.success) {
        toast.error(response?.message || "");
      }
    } catch (error) {
      toast.error(error.toString() || "Something went wrong try again later");
    }
  }

  return (
    <>
      <Grid
        container
        padding={"20px 0"}
        wrap={"nowrap"}
        justifyContent={"center"}
      >
        <Grid item xs={12}>
          <Grid
            item
            container
            style={{
              border: "1px solid #F2F4F7",
              padding: "20px",
              backgroundColor: "#F9F9FB",
            }}
            alignItems="center"
            justifyContent={"flex-end"}
          >
            <Grid item xs={12}>
              <Typography className={classes.title}>
                Logging in Settings
              </Typography>
              <Typography className={classes.subtitle}>
                Login settings allow you to customize your login experience and
                enhance the security of your account.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={9}>
              <Typography
                className={classes.TextStyle}
                paddingTop={isMobile ? 3 : 0}
              >
                Allow login attempts
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Cselect
                placeholder="Select attempt"
                value={attempts}
                handleSelect={(e) => {
                  setAttempts(e);
                  updateAttempts(e);
                }}
                renderTags={["Unset", "1", "2", "3", "4", "5"]}
              />
            </Grid>
            {/* <Divider width={"100%"} />
            <Grid item container style={{ marginBottom: 15 }}>
              <Grid
                item
                xs={12}
                md={9}
                sm={12}
                lg={9}
                style={{ marginTop: 20 }}
              >
                <Typography
                  className={classes.TextStyle}
                >
                  Phone verifications
                </Typography>
                <Typography
                  className={classes.language}
                  paddingRight={2}
                >
                  Your phone is not verified with Reno. Click Verify Now to
                  complete phone verification
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                style={{ marginTop: 20 }}
              >
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
            </Grid> */}
            <Divider width={"100%"} />
            <Grid item container justifyContent={"space-between"}>
              <Grid item xs={10} sm={9} md={8} style={{ marginTop: 20 }}>
                <Typography className={classes.TextStyle}>
                  Two factors authentications
                </Typography>
                <Typography className={classes.language}>
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
                  checked={status2FA}
                  onChange={(event) => {
                    twoFectorAuth(event.target.checked);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          {loaderIndex ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <CircularProgress style={{ color: "#274BF1" }} size={30} />
            </div>
          ) : _.isArray(loginDeviceList) && !_.isEmpty(loginDeviceList) ? (
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
                <Typography className={classes.title}>
                  Connected devices
                </Typography>
                <Typography className={classes.subtitle}>
                  You are sign in on these devices
                </Typography>
              </Grid>
              {loginDeviceList?.map((it, ind) => {
                if (
                  _.isEmpty(it?.device_name) ||
                  _.isNull(it?.device_name) ||
                  _.isUndefined(it?.device_name)
                ) {
                  return null;
                } else {
                  return (
                    <>
                      <Grid
                        item
                        container
                        xs={12}
                        wrap="nowrap"
                        justifyContent={"space-between"}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        gap={1}
                      >
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          container
                          gap={1}
                          wrap="nowrap"
                        >
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
                            <Typography className={classes.TextStyle}>
                              {it?.device_name}
                            </Typography>
                            <Typography className={classes.language}>
                              {it?.address}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Button
                            style={{ alignItems: "center" }}
                            variant="outlined"
                            disabled={loaderIndex === ind}
                            onClick={() => singleDeviceLogoutApiCall(it, ind)}
                          >
                            {loaderIndex === ind ? (
                              <CircularProgress
                                style={{ color: "#274BF1" }}
                                size={26}
                              />
                            ) : (
                              "Signout"
                            )}
                          </Button>
                        </Grid>
                      </Grid>

                      <Divider width={"100%"} />
                    </>
                  );
                }
              })}

              <Grid
                item
                container
                marginTop={2}
                alignItems={"center"}
                justifyContent={"flex-end"}
                gap={2}
              >
                <Grid item>
                  <Typography className={classes.signOut}>
                    Signout from all other devices
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    onClick={setVisible}
                  >
                    {loaderIndex === "all" ? (
                      <CircularProgress style={{ color: "#FFF" }} size={26} />
                    ) : (
                      "Sign out now"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>

      <ConfirmModel
        message="Are you sure you want to sign out from all devices ?"
        visible={visible}
        handleClose={() => setVisible(false)}
        confirmation={() => logoutallApi()}
        loader={loaderIndex}
      />
    </>
  );
}
