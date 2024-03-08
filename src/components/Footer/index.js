import React from "react";
import { Grid, Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";
import { useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const { pathname } = location;
  const disabledFooter =
    pathname === "/contractor-profile" ||
    pathname === "/" ||
    pathname === "/dashboard" ||
    pathname === "/create-proposal" ||
    pathname === "/manage-project" ||
    pathname === "/ongoing-project" ||
    pathname === "/create-profile" ||
    pathname === "/request-proposal" ||
    pathname === "/balance-breakdown" ||
    pathname === "/user-management" ||
    pathname === "/chat";

  const handleDragStart = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {disabledFooter ? null : (
        <div className={classes.footerMainCon}>
          <Grid container className={classes.container}>
            <Grid
              container
              item
              xs={10}
              sm={10}
              md={10}
              display="flex"
              alignItems="center"
            >
              {" "}
              <Grid
                item
                onDragStart={handleDragStart}
                className={classes.topLeft}
              >
                <img
                  src={
                    pathname === "/signup" || (pathname === "/login" && sm)
                      ? Images.logo_black
                      : Images.logo_white
                  }
                  alt="logoimage"
                  className={classes.imgStyle}
                />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.footerTextStyle}
                  sx={{ color: pathname === "/signup" ? "#646F86" : "#FFFFFF" }}
                >
                  Copyright ⓒ 2023. All Rights Reserved by Reno. Version 1.0
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={2}
              sm={2}
              md={2}
              display="flex"
              alignItems="center"
              justifyContent={"flex-end"}
              className={classes.top}
            >
              <Grid item xs={4} sm={1} md={1} lg={1}>
                <img
                  src={Images.globe}
                  alt="globe"
                  className={classes.imgStyleLanguage}
                />
              </Grid>

              <Grid item xs={6} sm={5} md={4} lg={3}>
                <Typography className={classes.language}>ENG</Typography>
              </Grid>
              <Grid item xs={4} sm={1} md={1} lg={1}>
                <img
                  src={Images.doller}
                  alt="doller"
                  className={classes.imgStyleLanguage}
                />
              </Grid>
              <Grid item xs={6} sm={5} md={4} lg={3}>
                <Typography className={classes.language}>USD</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default Footer;
