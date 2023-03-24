import React from "react";
import { Grid, Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.footerMainCon}>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={6} display="flex" alignItems="center">
          <img
            src={Images.flogo}
            alt="logoimage"
            className={classes.imgStyle}
          />
          <Typography className={classes.footerTextStyle}>
            Copyright ⓒ 2003. All Rights Reserved by Reno. Version 1.0
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography className={classes.footerTextStyle}>ENG</Typography>
          <Typography className={classes.footerTextStyle}>USD</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
