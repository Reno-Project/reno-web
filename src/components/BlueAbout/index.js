import { Grid, IconButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import { color } from "../../config/theme";
import Images from "../../config/images";
import { useLocation } from "react-router-dom";

export default function BlueAbout() {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;

  const quickLinks = ["Home", "Our Serives", "About us", "FAQs", "Sign Up"];
  const supportArr = [
    "Help & Support",
    "Trust & Safety",
    "Selling on Reno",
    "Buying on Reno",
  ];
  const contactus = ["+1 0234 573 875", "reno.renovation.mailus.com"];

  return (
    <div>
      <Grid
        container
        className={classes.container}
        rowGap={6}
        margin={0}
        width={"100%"}
        maxWidth={"unset"}
        mb={pathname !== "/contractor-profile" && "70px"}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          className={classes.subContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {<img src={Images.logo_white} alt="logo" style={{ maxWidth: 225 }} />}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography
              variant="h5"
              style={{
                marginBottom: 20,
                color: color.white,
                fontWeight: "bold",
              }}
            >
              Quick Links
            </Typography>
          </Grid>
          {quickLinks.map((item, index) => {
            return (
              <div key={`quickLinks_${index}`}>
                <ListItemText className={classes.text}>{item}</ListItemText>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography
              variant="h5"
              style={{
                marginBottom: 20,
                color: color.white,
                fontWeight: "bold",
              }}
            >
              Contact Us
            </Typography>
          </Grid>
          {contactus.map((item, index) => {
            return (
              <div key={`contactus_${index}`}>
                <ListItemText className={classes.text}>{item}</ListItemText>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography
              variant="h5"
              style={{
                marginBottom: 20,
                color: color.white,
                fontWeight: "bold",
              }}
            >
              Follow Us
            </Typography>
          </Grid>
          <Grid item xs={12} rowGap={2}>
            <IconButton sx={{ py: 1, pr: 1, pl: 0 }}>
              <img src={Images.fb_white} alt="fb_logo" />
            </IconButton>
            <IconButton sx={{ py: 1, px: 1 }}>
              <img src={Images.twitter} alt="twitter_logo" />
            </IconButton>
            <IconButton sx={{ py: 1, px: 1 }}>
              <img src={Images.insta_white} alt="insta_logo" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.footerTextStyle}>
            2023 © Reno. All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
