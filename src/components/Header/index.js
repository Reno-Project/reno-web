import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/reducers/auth/actions";
import Images from "../../config/images";
import useStyles from "./styles";

function Header(props) {
  const currentUrl = window.location.href;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearAllData } = authActions;
  const isAddPadding = useMediaQuery(theme.breakpoints.down(1260));
  const { token } = useSelector((state) => state.auth);

  // this function for logout
  function logout() {
    dispatch(clearAllData());
    navigate("/login");
  }

  return (
    <div
      className={classes.headerMainCon}
      style={
        isAddPadding ? { paddingLeft: "15px", paddingRight: "15px" } : null
      }
    >
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sm={3}
          xs={4}
          className={classes.leftContainer}
        >
          <div className={classes.imgContainer}>
            <img
              alt="logo"
              src={Images.header_logo}
              className={classes.imgStyle}
            />
          </div>
        </Grid>
        <Grid
          item
          lg={9}
          md={9}
          sm={9}
          xs={8}
          className={classes.rightContainer}
        >
          {currentUrl?.includes("signup") ||
          currentUrl?.includes("login") ||
          !isEmpty(token) ? null : (
            <Grid item className={classes.PR25}>
              <NavLink to="" className={classes.linkStyle}>
                <Typography className={classes.menuTitleStyle}>
                  Become a contractor
                </Typography>
              </NavLink>
            </Grid>
          )}
          <Grid item>
            {token !== "" ? (
              <Button
                variant="contained"
                color="primary"
                style={{ paddingLeft: "35px", paddingRight: "35px" }}
                onClick={logout}
              >
                Logout
              </Button>
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
