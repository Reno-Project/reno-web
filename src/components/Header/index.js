import React from "react";
import { NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button, Grid, Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";

function Header(props) {
  const currentUrl = window.location.href;
  const classes = useStyles();
  const theme = useTheme();
  const isAddPadding = useMediaQuery(theme.breakpoints.down(1260));

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
          {currentUrl?.includes("signup") ? null : (
            <Grid item className={classes.PR25}>
              <NavLink to="" className={classes.linkStyle}>
                <Typography className={classes.menuTitleStyle}>
                  Become a contractor
                </Typography>
              </NavLink>
            </Grid>
          )}
          <Grid item>
            <NavLink to="/login" className={classes.linkStyle}>
              <Button
                variant="contained"
                color="primary"
                style={{ paddingLeft: "35px", paddingRight: "35px" }}
              >
                Login
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
