import React from "react";
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

function Header(props) {
  const currentUrl = window.location.href;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAllData } = authActions;
  const { token, userData } = useSelector((state) => state.auth);
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // this function for logout
  function logout(type) {
    dispatch(clearAllData());
    handleClose();
    setTimeout(() => {
      type === "signup" ? navigate("/signup") : navigate("/login");
    }, 500);
  }

  return (
    <div className={classes.headerMainCon} style={{ padding: "0 15px" }}>
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sm={3}
          xs={3}
          className={classes.leftContainer}
        >
          <div
            className={classes.imgContainer}
            onClick={() => {
              if (userData?.contractor_data?.profile_completed === "pending") {
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
            <Grid item style={{ paddingLeft: 30 }}>
              <NavLink to="" className={classes.linkStyle}>
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
          xs={9}
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
            {!isEmpty(token) ? (
              <>
                {!sm && (
                  <>
                    {userData?.contractor_data?.profile_completed ===
                      "pending" || currentUrl?.includes("otp-verify") ? null : (
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
                          <Button variant="contained">Projects</Button>
                        </Grid>
                        <Grid item>
                          <IconButton>
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
                      padding: 10,
                    },
                  }}
                >
                  {userData?.role === "reno" ||
                  userData?.contractor_data?.profile_completed ===
                    "pending" ? null : (
                    <>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          navigate("/contractor-profile");
                        }}
                        className={classes.logoutTextStyle}
                      >
                        View Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();

                          navigate("/account-setting");
                        }}
                        className={classes.logoutTextStyle}
                      >
                        Account Settings
                      </MenuItem>
                    </>
                  )}
                  <MenuItem
                    onClick={() => logout("")}
                    className={classes.logoutTextStyle}
                  >
                    Logout
                  </MenuItem>
                </Popover>
              </>
            ) : currentUrl.includes("login") ? (
              <NavLink to="/signup" className={classes.linkStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ paddingLeft: "35px", paddingRight: "35px" }}
                >
                  Signup
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/login" className={classes.linkStyle}>
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
  );
}

export default Header;
