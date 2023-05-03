import React from "react";
import { Grid, Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";
import { useLocation } from "react-router-dom";

function Footer(props) {
  const classes = useStyles();

  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname === "/contractor-profile" || pathname === "/" ? null : (
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
              <Grid item>
                <img
                  src={Images.flogo}
                  alt="logoimage"
                  className={classes.imgStyle}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.footerTextStyle}>
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
