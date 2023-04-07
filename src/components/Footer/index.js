import React from "react";
import { Grid, Typography } from "@mui/material";
import Images from "../../config/images";
import useStyles from "./styles";

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.footerMainCon}>
      <Grid container className={classes.container}>
        <Grid item xs={10} sm={10} md={10} display="flex" alignItems="center">
          <img
            src={Images.flogo}
            alt="logoimage"
            className={classes.imgStyle}
          />
          <Typography className={classes.footerTextStyle}>
            Copyright ⓒ 2023. All Rights Reserved by Reno. Version 1.0
          </Typography>
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
          <Grid>
          <img
            src={Images.globe}
            alt="globe"
            className={classes.imgStyleLanguage}
          />
          </Grid>
          
          <Grid item xs={8} sm={5} md={4} lg={3}>
            <Typography className={classes.language}>ENG</Typography>

          </Grid>
          <Grid item>
          <img
            src={Images.doller}
            alt="doller"
            className={classes.imgStyleLanguage}
          />
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Typography className={classes.language}>USD</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
