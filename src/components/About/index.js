import { Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";

export default function About() {
  const classes = useStyles();

  const aboutArr = [
    "Careers",
    "Press & News",
    "Partnerships",
    "Privacy Policy",
    "Terms of Service",
    "Intellectual Property Claims",
    "Investor Relations",
  ];
  const supportArr = [
    "Help & Support",
    "Trust & Safety",
    "Selling on Reno",
    "Buying on Reno",
  ];
  const communityArr = [
    "Customer Success Stories",
    "Community hub",
    "Forum",
    "Events",
    "Blog",
    "Influencers",
    "Affiliates",
  ];

  const AccountArr = [
    "Login",
    "Create Contractor Profile",
    "Create user profile",
    "Apps Download",
  ];
  return (
    <>
      <Grid container className={classes.container} rowGap={6}>
        <Grid
          item
          xs={7}
          sm={5}
          md={2}
          lg={2}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              About
            </Typography>
          </Grid>
          {aboutArr.map((item, index) => {
            return (
              <div>
                <Typography className={classes.text}>{item}</Typography>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={7}
          sm={5}
          md={2}
          lg={2}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              Support
            </Typography>
          </Grid>
          {supportArr.map((item, index) => {
            return (
              <div>
                <Typography className={classes.text}>{item}</Typography>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={7}
          sm={5}
          md={2}
          lg={2}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              Community
            </Typography>
          </Grid>
          {communityArr.map((item, index) => {
            return (
              <div>
                <Typography className={classes.text}>{item}</Typography>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={7}
          sm={5}
          md={2}
          lg={2}
          className={classes.subContainer}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
              Account
            </Typography>
          </Grid>
          {AccountArr.map((item, index) => {
            return (
              <div>
                <Typography className={classes.text}>{item}</Typography>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
