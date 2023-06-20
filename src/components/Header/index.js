import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Grid,
  Typography,
  Popover,
  Avatar,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import Images from "../../config/images";
import useStyles from "./styles";
import CInput from "../CInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ConfirmModel from "../ConfirmModel";
import {
  AccountBalanceWalletOutlined,
  AttachMoneyOutlined,
  FmdGoodOutlined,
  LogoutOutlined,
  Person2Outlined,
  SettingsOutlined,
  TranslateOutlined,
} from "@mui/icons-material";
import Cmodal from "../Cmodel";
import { getApiData } from "../../utils/APIHelper";
import { Setting } from "../../utils/Setting";

function Header(props) {
  const currentUrl = window.location.href;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAllData, setAccountTab } = authActions;
  const { token, userData, accountTab } = useSelector((state) => state.auth);
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [mopen, setMopen] = useState("");
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (!currentUrl.includes("account-setting") && accountTab !== 0) {
      dispatch(setAccountTab(0));
    }
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // this function for logout
  async function logout(type) {
    try {
      await getApiData(Setting.endpoints.logout, "POST");
      dispatch(clearAllData());
      handleClose();
      setVisible(false);
      setTimeout(() => {
        type === "signup" ? navigate("/signup") : navigate("/login");
      }, 500);
    } catch (error) {
      console.log("🚀 logout ~ error:", error);
    }
  }
  const handleDragStart = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={classes.headerMainCon} style={{ padding: "0 15px" }}>
        <Grid container>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={6}
            className={classes.leftContainer}
          >
            <div
              className={classes.imgContainer}
              onDragStart={handleDragStart}
              onClick={() => {
                if (
                  userData?.contractor_data?.profile_completed === "pending"
                ) {
                  return;
                } else {
                  navigate("/dashboard");
                }
              }}
            >
              <img
                alt="logo"
                src={Images.header_logo}
                className={classes.imgStyle}
              />
            </div>
            {currentUrl?.includes("signup") || currentUrl?.includes("login") ? (
              <Grid item style={{ paddingLeft: 10 }}>
                <NavLink
                  to="/how-it-works"
                  className={classes.linkStyle}
                  onDragStart={handleDragStart}
                >
                  <Typography className={classes.menuTitleStyle}>
                    How it works?
                  </Typography>
                </NavLink>
              </Grid>
            ) : null}
          </Grid>
          <Grid
            item
            lg={9}
            md={9}
            sm={9}
            xs={6}
            className={classes.rightContainer}
          >
            {location?.pathname === "/" && (
              <Grid item className={classes.PR25}>
                <NavLink to="/signup" className={classes.linkStyle}>
                  <Typography className={classes.menuTitleStyle}>
                    Become a contractor
                  </Typography>
                </NavLink>
              </Grid>
            )}

            <Grid item className={classes.rightLogoContainer} columnGap={1}>
              {currentUrl.includes("project/project-details") ? null : !isEmpty(
                  token
                ) ? (
                <>
                  {!sm && (
                    <>
                      {userData?.contractor_data?.profile_completed ===
                        "pending" ||
                      currentUrl?.includes("otp-verify") ? null : (
                        <CInput
                          placeholder="Search..."
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton>
                                <SearchRoundedIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                      {userData?.contractor_data?.profile_completed ===
                      "pending" ? null : ( // </Button> //   Become contarctor // > //   style={{ padding: "6px 6px", fontSize: "14px" }} //   color="primary" //   variant="contained" //   }} //     logout("signup"); //   onClick={() => { // <Button
                        <>
                          <Grid item>
                            <Button
                              variant="contained"
                              onClick={() => {
                                navigate("/manage-project");
                              }}
                            >
                              Projects
                            </Button>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => navigate("/chat")}>
                              <img src={Images.chatico} alt="chat" />
                            </IconButton>
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                  {currentUrl?.includes("notifications") ||
                  currentUrl?.includes("otp-verify") ||
                  userData?.contractor_data?.profile_completed ===
                    "pending" ? null : (
                    <Grid item>
                      <IconButton onClick={() => navigate("/notifications")}>
                        <img src={Images.BellSimple} alt="notification" />
                      </IconButton>
                    </Grid>
                  )}
                  {currentUrl?.includes("otp-verify") ? null : (
                    <>
                      {!userData?.profile_url ? (
                        <Avatar
                          style={{ color: "#FFF", cursor: "pointer" }}
                          onClick={handleClick}
                        />
                      ) : (
                        <img
                          alt="logo"
                          src={userData?.profile_url}
                          className={classes.logoStyle}
                          aria-describedby={id}
                          variant="contained"
                          onClick={handleClick}
                        />
                      )}
                    </>
                  )}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      style: {
                        paddingBottom: 10,
                      },
                    }}
                  >
                    {userData?.role === "reno" ||
                    userData?.contractor_data?.profile_completed ===
                      "pending" ? null : (
                      <>
                        <Grid
                          container
                          gap={1}
                          wrap="nowrap"
                          marginBottom={"14px"}
                          padding={"16px 16px 0"}
                        >
                          <Grid item display={"flex"} alignItems={"center"}>
                            <div
                              style={{
                                borderRadius: 25,
                                overflow: "hidden",
                              }}
                            >
                              <img src={userData?.profile_url} width={"40px"} />
                            </div>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{
                                color: "#030F1C",
                                fontFamily: "Roobert-Regular",
                                fontWeight: "500",
                                fontSize: "14px",
                                lineHeight: "20px",
                              }}
                            >
                              {userData?.username}
                            </Typography>
                            <Typography
                              style={{
                                color: "#646F86",
                                fontFamily: "Roobert-Regular",
                                fontWeight: "400",
                                fontSize: "12px",
                                lineHeight: "16px",
                                marginTop: "4px",
                              }}
                            >
                              <FmdGoodOutlined fontSize={"200px"} />{" "}
                              {userData?.contractor_data?.company_address}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "#E5F1FF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ACD2FF",
                            borderRadius: "8px",
                            margin: "14px 16px",
                          }}
                        >
                          <Typography
                            style={{
                              color: "#0075FF",
                              fontFamily: "Roobert-Regular",
                              fontWeight: "500",
                              fontSize: "14px",
                              lineHeight: "20px",
                              padding: "7px 10px",
                            }}
                          >
                            Balance: AED 500.00
                          </Typography>
                        </Grid>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            navigate("/contractor-profile");
                          }}
                          className={classes.logoutTextStyle}
                        >
                          <Person2Outlined style={{ marginRight: 10 }} />
                          View Profile
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            navigate("/account-setting");
                          }}
                          className={classes.logoutTextStyle}
                        >
                          <SettingsOutlined style={{ marginRight: 10 }} />
                          Account Settings
                        </MenuItem>
                        <MenuItem
                          className={classes.logoutTextStyle}
                          onClick={() => setMopen("currency")}
                        >
                          <AttachMoneyOutlined style={{ marginRight: 10 }} />
                          Currency
                        </MenuItem>
                        <MenuItem
                          className={classes.logoutTextStyle}
                          onClick={() => setMopen("language")}
                        >
                          <TranslateOutlined style={{ marginRight: 10 }} />
                          Language
                        </MenuItem>
                        <MenuItem className={classes.logoutTextStyle}>
                          <AccountBalanceWalletOutlined
                            style={{ marginRight: 10 }}
                          />
                          Billing History
                        </MenuItem>
                      </>
                    )}
                    <MenuItem
                      onClick={() => setVisible(!visible)}
                      style={{ color: "#F26B59" }}
                      className={classes.logoutTextStyle}
                    >
                      <LogoutOutlined style={{ marginRight: 10 }} />
                      Sign out
                    </MenuItem>
                  </Popover>
                </>
              ) : currentUrl.includes("login") ? (
                <NavLink
                  to="/signup"
                  className={classes.linkStyle}
                  onDragStart={handleDragStart}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ paddingLeft: "35px", paddingRight: "35px" }}
                  >
                    Signup
                  </Button>
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={classes.linkStyle}
                  onDragStart={handleDragStart}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ paddingLeft: "35px", paddingRight: "35px" }}
                  >
                    Login
                  </Button>
                </NavLink>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Cmodal
        visible={
          mopen === "currency" ? true : mopen === "language" ? true : false
        }
        handleClose={() => setMopen("")}
        currency={mopen}
      />

      <ConfirmModel
        visible={visible}
        handleClose={() => setVisible(false)}
        confirmation={() => logout("")}
        message="Are you sure you want to sign out ?"
      />
    </>
  );
}

export default Header;
